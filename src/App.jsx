import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import JobPostForm from './components/Employer/JobPostPage'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      
        <Route path="/p" element={<JobPostForm/>}/>
        

      
     </Routes> 
    </>
  )
}

export default App
