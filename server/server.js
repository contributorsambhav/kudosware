const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer'); // Import multer
const { restrictToLoginUserOnly } = require("./middleware/auth.js");
const profileRoutes = require("./routes/profileRoutes.js");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'https://kudosware-jxcp.onrender.com',
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.static(path.join(__dirname, "/client/dist")));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to the uploads directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Append the original filename with the current timestamp
  }
});

const upload = multer({ storage: storage });

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("yes api works");
});

app.use('/profile', restrictToLoginUserOnly, profileRoutes);

// Resume Upload Route
app.post('/api/upload-resume', restrictToLoginUserOnly, upload.single('resume'), (req, res) => {
  console.log('Request received at /api/upload-resume'); // Log request

  try {
    if (!req.file) {
      return res.status(400).send({ msg: "No file uploaded" });
    }

    console.log('File uploaded:', req.file); // Log uploaded file details

    return res.status(200).send({ msg: "Resume uploaded successfully", file: req.file });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).send({ msg: "Error uploading file" });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
