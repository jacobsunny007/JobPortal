import React, { useRef } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { FaUsers, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const footerRef = useRef(null); 

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="font-sans">
    <nav className="flex justify-between items-center p-6 shadow-md">
        <div className="flex items-center space-x-2 text-xl font-bold text-blue-600">
          <span className="text-2xl">🔍</span>
          <span>JobPortal</span>
        </div>
        <div className="flex space-x-4">
          {/* 👇 Modified Button */}
          <button
            onClick={scrollToFooter}
            className="text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-lg transition"
          >
            About Us
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-blue-100 to-white">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 ">
            Your Dream Job 
          </h1>
          <h1><span className="text-blue-600 font-bold">Awaits You</span></h1>
          <p className="text-gray-600 text-xl font-bold">
            Connect with top employers worldwide and discover opportunities that match your skills, passion, and career goals.
          </p>
          <div className="flex space-x-4">
          <Link to="/e">
           <button className="bg-blue-600 hover:bg-blue-700 text-blue-600 px-8 py-4 rounded-xl text-2xl font-semibold">
            Find Your Job
           </button>
           </Link>
           <Link to="/j">
          <button className="bg-green-700 text-green-600 px-8 py-4 rounded-xl text-2xl font-semibold">
          Hire Talent
           </button>
           </Link>
          </div>

        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
         <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="job search macbook"
          className="rounded-xl shadow-lg w-3/4 mx-auto h-auto"
        />
</div>

      </div>

      {/* STATS SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-around py-12 bg-white text-center border-t">
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <FaUsers className="text-blue-600 text-3xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">50,000+</p>
            <p className="text-gray-600 font-bold">Active Job Seekers</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <FaBriefcase className="text-green-600 text-3xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">100,000+</p>
            <p className="text-gray-600 font-bold">Job Openings</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaChartLine className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">98%</p>
            <p className="text-gray-600 font-bold">Placement Success Rate</p>
          </div>
        </div>
      </div>
      {/* CHOOSE PATH SECTION */}
      <div className="bg-gray-50 py-16 px-10 text-center">
        <h2 className="text-5xl font-bold text-blue-800 mb-4">Choose Your Path</h2>
        <p className="text-2xl font-bold text-gray-800 mb-4">
          Whether you're looking for your next opportunity or searching for top talent, we've got you covered.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Job Seekers Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="job seeker on laptop"
              className="rounded-lg h-48 w-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Job Seekers</h3>
            <p className="text-gray-600 mb-4">
              Discover thousands of job opportunities. Build your profile, showcase your skills, and land your dream job.
            </p>
            <ul className="text-left text-gray-600 list-disc list-inside space-y-1 mb-4">
              <li>Easy application process</li>
              <li>Track application status</li>
              <li>Personalized job recommendations</li>
            </ul>
            <Link to="/j">
            <button className="bg-blue-600 hover:bg-blue-700 text-black px-5 py-2 rounded-lg text-sm">
              Explore Opportunities
            </button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
              alt="modern company workspace"
              className="rounded-lg h-48 w-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">For Employers</h3>
            <p className="text-gray-600 mb-4">
              Find the perfect candidates. Post jobs, review applications, and build your dream team.
            </p>
            <ul className="text-left text-gray-600 list-disc list-inside space-y-1 mb-4">
              <li>Access to quality candidates</li>
              <li>Easy job posting tools</li>
              <li>Manage applications efficiently</li>
            </ul>
            <Link to="/e">
            <button className="bg-green-600 hover:bg-green-700 text-black px-5 py-2 rounded-lg text-sm">
              Start Hiring
            </button>
            </Link>
          </div>
        </div>
      </div>
    <footer
        ref={footerRef}
        className="bg-gray-800 text-white px-6 py-10 text-sm"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-gray-300 font-semibold mb-2">Corporate Office</h4>
          <p>Info Edge (India) Limited</p>
          <p>B - 8, Sector - 132</p>
          <p>Noida - 201304</p>
          <p>India</p>
          <p className="mt-2">Phone: +91-120-4841100, +91-120-3082000</p>
          <p>Fax: +91-120-3082095</p>
          <p>Email: <a href="mailto:jobportal@gmail.com" className="underline">jobportal@gmail.com</a></p>
        </div>
        {/* Registered Office */}
        <div>
          <h4 className="text-gray-300 font-semibold mb-2">Registered Office</h4>
          <p>Info Edge (India) Limited</p>
          <p>GF-12A, 94 Meghdoot Building,</p>
          <p>Nehru Place,</p>
          <p>New Delhi - 110019</p>
        </div>
        {/* Other Office */}
        <div>
          <h4 className="text-gray-300 font-semibold mb-2">Other Office</h4>
          <p>Info Edge (India) Limited</p>
          <p>A-88, Sector - 2,</p>
          <p>Noida - 201301</p>
          <p>India</p>
        </div>
        {/* Social Media */}
       <div>
  <h4 className="text-gray-300 font-semibold mb-2 text-center">Follow us on</h4>
  <div className="flex justify-center space-x-4 mb-4">
    <a href="#" className="bg-gray-600 p-2 rounded-full hover:bg-blue-700">
      <FaFacebookF />
    </a>
    <a href="#" className="bg-gray-500 p-2 rounded-full hover:bg-sky-600">
      <FaTwitter />
    </a>
    <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-800">
      <FaLinkedinIn />
    </a>
  </div>
</div>

      </div>
      {/* Working Hours */}
      <div className="text-center mt-8 text-gray-300">
        Working Hours: 9:30 AM to 6 PM, Monday to Saturday, Except Holidays
      </div>
    </footer>
    </div> 
  );
}