import React, { useRef } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaUsers, FaBriefcase, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const footerRef = useRef(null);
  const choosePathRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToChoosePath = () => {
    choosePathRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="font-sans bg-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
          <span>🔍</span>
          <span>JobPortal</span>
        </div>
        <div>
          <button
            onClick={scrollToFooter}
            className="text-blue-600 font-semibold border border-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-black transition duration-300"
          >
            About Us
          </button>
           <Link to="/ad">
         <button 
            className="text-blue-600 hover:text-black hover:bg-blue-600 border border-blue-600 px-4 py-2 rounded-lg transition">
          Admin
          </button>
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-10 py-20 bg-gradient-to-r from-blue-100 to-white">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold text-gray-800">Your Dream Job</h1>
          <h2 className="text-5xl font-bold text-blue-600">Awaits You</h2>
          <p className="text-xl text-gray-600 font-medium">
            Connect with top employers worldwide and discover opportunities that match your skills, passion, and career goals.
          </p>
          <div className="flex space-x-6">
            <button
              onClick={scrollToChoosePath}
              className="bg-blue-600 hover:bg-blue-700 text-green-600 text-xl px-6 py-3 rounded-xl font-semibold"
            >
              Find Your Job
            </button>
            <button
              onClick={scrollToChoosePath}
              className="bg-green-600 hover:bg-green-700 text-blue-600 text-xl px-6 py-3 rounded-xl font-semibold"
            >
              Hire Talent
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
            alt="job search"
            className="rounded-xl shadow-lg w-3/4 mx-auto"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="flex flex-col md:flex-row justify-around items-center py-12 border-t bg-white text-center">
        <div className="flex items-center space-x-4 mb-8 md:mb-0">
          <FaUsers className="text-blue-600 text-4xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">50,000+</p>
            <p className="text-gray-600 font-medium">Active Job Seekers</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mb-8 md:mb-0">
          <FaBriefcase className="text-green-600 text-4xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">100,000+</p>
            <p className="text-gray-600 font-medium">Job Openings</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaChartLine className="text-yellow-500 text-4xl" />
          <div>
            <p className="text-2xl font-bold text-gray-800">98%</p>
            <p className="text-gray-600 font-medium">Placement Success</p>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH */}
      <section ref={choosePathRef} className="bg-gray-100 py-20 px-10 text-center">
        <h2 className="text-5xl font-bold text-blue-800 mb-4">Choose Your Path</h2>
        <p className="text-2xl text-gray-700 font-medium mb-12">
          Whether you're looking for your next opportunity or searching for top talent, we've got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Job Seekers */}
          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
              alt="job seeker"
              className="rounded-lg h-48 w-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">For Job Seekers</h3>
            <p className="text-gray-600 mb-4">
              Discover thousands of job opportunities. Build your profile, showcase your skills, and land your dream job.
            </p>
            <ul className="text-left list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Easy application process</li>
              <li>Track your applications</li>
              <li>Get personalized recommendations</li>
            </ul>
            <Link to="/j">
            <button className="bg-blue-600 hover:bg-blue-700 text-black px-5 py-2 rounded-lg text-sm">
              Explore Opportunities
            </button>
            </Link>
          </div>

          {/* Employers */}
          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998"
              alt="employer office"
              className="rounded-lg h-48 w-full object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">For Employers</h3>
            <p className="text-gray-600 mb-4">
              Post jobs, manage candidates, and find top talent to grow your team and business.
            </p>
            <ul className="text-left list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Post jobs easily</li>
              <li>Browse qualified applicants</li>
              <li>Manage hiring efficiently</li>
            </ul>
            <Link to="/e">
            <button className="bg-green-600 hover:bg-green-700 text-black px-5 py-2 rounded-lg text-sm">
              Start Hiring
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer ref={footerRef} className="bg-gray-800 text-white px-6 py-10 text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Corporate Office */}
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
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gray-300 font-semibold mb-2 text-center">Follow us on</h4>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="bg-gray-600 p-2 rounded-full hover:bg-blue-700"><FaFacebookF /></a>
              <a href="#" className="bg-gray-500 p-2 rounded-full hover:bg-sky-600"><FaTwitter /></a>
              <a href="#" className="bg-gray-700 p-2 rounded-full hover:bg-blue-800"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-300">
          Working Hours: 9:30 AM to 6 PM, Monday to Saturday, Except Holidays
        </div>
      </footer>
    </div>
  );
}