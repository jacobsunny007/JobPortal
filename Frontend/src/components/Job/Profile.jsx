import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:5000/api/seeker/profile?email=${email}`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error("Failed to fetch profile", err);
        navigate("/");
      });
  }, [navigate]);

  if (!user) {
    return (
      <div className="text-center text-gray-500 mt-20 text-lg">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f7ff] via-[#dcefff] to-[#e0f7ff] px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-lg border border-blue-100 rounded-3xl shadow-xl p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-28 h-28 bg-blue-500 text-white text-4xl font-bold rounded-full flex items-center justify-center shadow-md">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-blue-600">{user.name}</h2>
            <p className="text-gray-700 text-sm">{user.email}</p>
            <p className="text-gray-700 text-sm">Age: {user.age}</p>
            <p className="text-gray-700 text-sm">{user.location}</p>
            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm hover:text-blue-600"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-blue-600 mb-1">About Me</h3>
          <p className="text-gray-800 text-sm leading-relaxed">
            {user.bio || "No bio available."}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
          <Link to="/editprofile">
            <button className="w-full sm:w-auto px-5 py-2 font-medium rounded-lg text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition">
              Edit Profile
            </button>
          </Link>
          <Link to="/job">
            <button className="w-full sm:w-auto px-5 py-2 font-medium rounded-lg text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 transition">
              Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
