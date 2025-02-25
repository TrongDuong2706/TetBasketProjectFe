import React from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'

export default function Header() {
  return (
    <div className='header bg-white p-4 shadow-md flex justify-between items-center'>
      <h1 className='text-lg font-semibold text-gray-800'>Dashboard</h1>
      <div className='flex items-center space-x-4'>
        <FaBell className='text-gray-500 hover:text-red-500 cursor-pointer transition duration-300' />
        <FaUserCircle className='text-gray-500 text-2xl hover:text-red-500 cursor-pointer transition duration-300' />
      </div>
    </div>
  )
}
