import React from 'react'
import { FaChartPie, FaBox, FaEnvelope, FaTable, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='sidebar w-56 bg-gradient-to-b from-red-800 to-red-600 shadow-md p-4 text-white rounded-r-xl'>
      <h2 className='text-xl font-semibold mb-6 tracking-wide'>Luxy Gift Tet</h2>
      <nav>
        <ul className='space-y-2'>
          <Link to='/admin'>
            <li className='flex items-center p-2 bg-yellow-500 text-red-900 rounded-md font-medium hover:bg-yellow-400 transition duration-300'>
              <FaChartPie className='mr-2' /> Dashboard
            </li>
          </Link>
          <Link to='/admin/basket'>
            <li className='flex items-center p-2 hover:bg-red-700 rounded-md transition duration-300'>
              <FaBox className='mr-2' /> Basket
            </li>
          </Link>
          <li className='flex items-center p-2 hover:bg-red-700 rounded-md transition duration-300'>
            <FaEnvelope className='mr-2' /> Email
          </li>
          <li className='flex items-center p-2 hover:bg-red-700 rounded-md transition duration-300'>
            <FaUser className='mr-2' /> Forms
          </li>
          <li className='flex items-center p-2 hover:bg-red-700 rounded-md transition duration-300'>
            <FaTable className='mr-2' /> Tables
          </li>
        </ul>
      </nav>
    </div>
  )
}
