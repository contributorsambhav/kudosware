import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState } from "react";
import { login } from '../store/authSlice';
import ResumeUpload from './Upload';

function Navigation() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    axios
      .get("http://localhost:5000/profile", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.user);
        const data = res.data.user;
        dispatch(login(data));
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  }, [dispatch]);

  const user = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);

  return (
    <nav className="bg-black text-white p-4 shadow-md w-[50vw] mx-auto sticky top-0 z-50">
      <div className="container mx-auto">
        <ul className="flex space-x-6 justify-center">
          <li>
            <Link
              to="/"
              className="hover:text-green-400 transition-colors duration-300"
            >
              {user ? user.name : "No active session"}
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-green-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          
          {authStatus && (
            <li>
              <Link
                to="/upload-resume"
                className="hover:text-green-400 transition-colors duration-300"
              >
              Upload Resume
              </Link>
            </li>
          )}
          {!authStatus && (
            <li>
              <Link
                to="/login"
                className="hover:text-green-400 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
          )}

          {!authStatus && (
            <li>
              <Link
                to="/signup"
                className="hover:text-green-400 transition-colors duration-300"
              >
                SignUp
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
