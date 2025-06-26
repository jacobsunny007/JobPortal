import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobPostPage from './components/Employer/JobPostPage'
import { Route, Routes } from 'react-router-dom'
import Employerlogin from './components/SignIn/Employerlogin'
import Jobseeker from './components/SignIn/Jobseeker'
import Navbar from './components/Navbar/Nav'
import Job from './components/Job/Job'
import LandingPage from './components/SignIn/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/> */}
    {/* <Job/> */}
     <Routes>
        <Route path='/' element={<LandingPage/>}/>
         <Route path="/job-post" element={<JobPostPage/>}/>
        <Route path="/e" element={<Employerlogin/>}/>
        <Route path="/j" element={<Jobseeker/>}/>  
        <Route path="/job" element={<Job/>} /> 
     </Routes>   
    </>
  )
}

export default App
