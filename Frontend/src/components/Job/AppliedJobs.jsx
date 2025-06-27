import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("You must be logged in!");
      navigate('/');
      return;
    }

    axios.get(`http://localhost:5000/api/applied-jobs?email=${email}`)
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Failed to fetch applied jobs", err));
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0eafc] via-[#cfdef3] to-[#e0eafc] px-6 py-10 font-sans text-gray-800">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-blue-700">Your Applied Jobs</h2>
        <button
          className="bg-blue-600 text-blue-600 px-5 py-2 rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => navigate('/job')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">You haven’t applied to any jobs yet.</p>
        ) : (
          jobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 + index * 0.05 }}
              className="bg-white/30 backdrop-blur-lg shadow-md border border-white/40 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">{job.title}</h3>
              <p className="text-gray-700 font-medium">{job.company}</p>
              <p className="text-sm text-gray-500">{job.location}</p>
              <p className="text-sm text-gray-600 my-2 line-clamp-2">{job.description}</p>
              <p className="text-green-600 font-bold mb-2">{job.salary}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{job.type}</span>
                <span className="text-gray-500">{new Date(job.postedAt).toLocaleDateString()}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}