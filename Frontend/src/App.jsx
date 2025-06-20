import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobPostForm from './components/Employer/JobPostPage'
import { Route, Routes } from 'react-router-dom'
import Employerlogin from './components/SignIn/Employerlogin'
import Jobseeker from './components/SignIn/Jobseeker'
import Navbar from './components/Navbar/Nav'
import Job from './components/Job/Job'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Navbar/> */}
    <Job/>
     {/* <Routes>
        <Route path="/p" element={<JobPostForm/>}/>
        <Route path="/e" element={<Employerlogin/>}/>
        <Route path="/j" element={<Jobseeker/>}/>  
        <Route path="/h" element={<Job/>} /> 
     </Routes>   */}
    </>
  )
}

export default App
