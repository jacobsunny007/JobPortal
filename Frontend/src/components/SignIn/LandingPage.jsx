import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 shadow-md">
        <div className="flex items-center space-x-2 text-xl font-bold text-blue-600">
          <span className="text-2xl">🔍</span>
          <span>JobPortal</span>
        </div>
      </nav>

      {/* Header */}
      <div className="text-center mt-8">
        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm font-semibold shadow inline-block mb-4">
          🚀 Your Career Journey Starts Here
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600">
          Find <span className="text-green-600">Your Perfect Job Match</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-md">
          Connect talented professionals with top employers. Whether you're seeking your next opportunity or looking to hire the best talent, we've got you covered.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-8 px-4">
        {/* Job Seekers */}
        <div className="bg-blue-50 p-6 rounded-xl w-full md:w-80 shadow text-center border border-blue-100">
          <div className="text-4xl mb-4 text-blue-600">👥</div>
          <h2 className="font-bold text-lg">Job Seekers</h2>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Find your dream job from thousands of opportunities
          </p>
          <ul className="text-sm text-left mb-4 space-y-1 text-green-700">
            <li>✅ Browse thousands of jobs</li>
            <li>✅ Create professional profile</li>
            <li>✅ Get matched with employers</li>
          </ul>
          <Link to="/j">
          <button className="bg-blue-600 text-black py-2 px-4 rounded-full hover:bg-blue-700 w-full">
            Login as Job Seeker
          </button>
          </Link>
        </div>

        {/* Employers */}
        <div className="bg-green-50 p-6 rounded-xl w-full md:w-80 shadow text-center border border-green-100">
          <div className="text-4xl mb-4 text-green-600">📄</div>
          <h2 className="font-bold text-lg">Employers</h2>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Find and hire the best talent for your company
          </p>
          <ul className="text-sm text-left mb-4 space-y-1 text-green-700">
            <li>✅ Post unlimited jobs</li>
            <li>✅ Access talent pool</li>
            <li>✅ Advanced filtering tools</li>
          </ul>
          <Link to="/e">
          <button className="bg-green-600 text-black py-2 px-4 rounded-full hover:bg-green-700 w-full">
            Login as Employer
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
