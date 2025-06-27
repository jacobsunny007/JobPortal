import React from 'react';
import { Link } from 'react-router-dom';

export default function UserProfile() {
  const user = {
    name: "Jacob Sunny",
    age: 27,
    email: "jacob@example.com",
    location: "Bangalore, India",
    phone: "+91 9876543210",
    linkedin: "https://www.linkedin.com/in/jacobsunny",
    bio: "Frontend Developer with 3 years of experience in building responsive web apps.",
  };

  return (
    <div className="bg-white min-h-screen py-10 px-6 md:px-16 font-sans">
      <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-green-500 text-white text-3xl flex items-center justify-center rounded-full">
            {user.name[0]}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800">{user.name}</h2>
            <p className="text-green-600">Age: {user.age}</p>
            <p className="text-green-600">{user.email}</p>
            <p className="text-gray-600">{user.location}</p>
            <p className="text-gray-600">{user.phone}</p>
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">About</h3>
          <p className="text-gray-700">{user.bio}</p>
        </div>

        <div className="text-right">
            <Link to="/editprofile">
          <button className="bg-green-500 hover:bg-green-600 text-blue-600 px-5 py-2 rounded-lg">
            Edit Profile
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
