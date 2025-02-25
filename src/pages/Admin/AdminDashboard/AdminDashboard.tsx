import React from 'react'
import { FaChartPie, FaBox, FaEnvelope, FaTable, FaUser, FaBell, FaUserCircle } from 'react-icons/fa'
import Header from 'src/components/AdminComponents/Header'
import SideBar from 'src/components/AdminComponents/SideBar'

export default function AdminDashboard() {
  return (
    <div className='main-content p-4'>
      {/* Stats Cards */}
      <div className='grid grid-cols-4 gap-4'>
        {[
          { title: 'New Orders', value: '57', percentage: '+10%' },
          { title: 'Pending Orders', value: '5', percentage: '-3%' },
          { title: 'Out of Stock', value: '15', percentage: '0%' },
          { title: 'Revenue', value: '$48,697', percentage: '+42%' }
        ].map((item, index) => (
          <div
            key={index}
            className='bg-white p-4 shadow-sm rounded-md border-l-4 border-yellow-500 transition transform hover:scale-105 duration-300'
          >
            <h3 className='text-gray-600 text-sm font-medium'>{item.title}</h3>
            <p className='text-2xl font-bold text-red-600'>{item.value}</p>
            <p className={`text-xs font-medium ${item.percentage.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
              {item.percentage}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Chart Placeholder */}
      <div className='mt-4 bg-white p-4 rounded-md shadow-sm border-l-4 border-yellow-500 transition transform hover:scale-105 duration-300'>
        <h3 className='text-md font-semibold text-yellow-500'>Total Saless</h3>
        <p className='text-gray-500 text-xs'>Graph placeholder</p>
      </div>

      {/* Other Charts */}
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className='bg-white p-4 rounded-md shadow-sm border-l-4 border-yellow-500 transition transform hover:scale-105 duration-300'
          >
            <h3 className='text-md font-semibold text-yellow-500'>Chart</h3>
            <p className='text-gray-500 text-xs'>Graph placeholder</p>
          </div>
        ))}
      </div>
    </div>
  )
}
