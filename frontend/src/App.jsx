import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GetEmployees from './pages/GetEmployees'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/employees" element={<GetEmployees/>} />
     
    </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
