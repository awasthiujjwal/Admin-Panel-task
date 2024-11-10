import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminNav = () => {
    let navigate = useNavigate()
    const handleLogout = async() => {
        navigate('/')
    }
  return (
    <div className='w-full dark:bg-gray-700 text-white py-3 flex justify-between items-center px-5'>
      <ul className='flex gap-4 items-center'>
        <li><Link to={'/dashboard'}>Home</Link></li>
        <li><Link to={'/employees'}>Employee-List</Link></li>
      </ul>
      <ul className='flex gap-4 items-center'>
        <li><Link>Name</Link></li>
        <li><button onClick={handleLogout} className='bg-green-300 py-2 px-4 rounded-md'>Logout</button></li>
      </ul>
    </div>
  )
}

export default AdminNav
