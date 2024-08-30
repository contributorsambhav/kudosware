import React, { useState } from 'react';
import axios from 'axios';

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('resume', file); // Assuming `file` is the file object
  
    try {
      const response = await axios.post('https://kudosware-jxcp.onrender.com/api/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // Include cookies in the request
      });
  
      console.log(response.data);
      setMessage('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to upload resume.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 p-6">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Upload Your Resume</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Resume (PDF or DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full p-2 rounded-md border border-gray-700 bg-gray-800 text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResumeUpload;
