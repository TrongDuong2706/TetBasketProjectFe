import React from 'react'
import { FaChartPie, FaBox, FaEnvelope, FaTable, FaUser } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

export default function SideBar() {
  const location = useLocation() // Lấy đường dẫn hiện tại

  // Danh sách menu
  const menuItems = [
    { to: '/admin', icon: <FaChartPie className='mr-2' />, label: 'Trang Chủ' },
    { to: '/admin/basket-category', icon: <FaUser className='mr-2' />, label: 'Quản lý Loại giỏ hàng' },
    { to: '/admin/basket-shell', icon: <FaTable className='mr-2' />, label: 'Quản lý Loại vỏ' },
    { to: '/admin/basket', icon: <FaBox className='mr-2' />, label: 'Quản lý giỏ hàng' },
    { to: '/admin/orders', icon: <FaEnvelope className='mr-2' />, label: 'Quản lý đơn hàng' }
  ]

  return (
    <div className='sidebar w-56 bg-gradient-to-b from-red-800 to-red-600 shadow-md p-4 text-white rounded-r-xl'>
      <h2 className='text-xl font-semibold mb-6 tracking-wide'>Giỏ Quà Tết</h2>
      <nav>
        <ul className='space-y-2'>
          {menuItems.map((item) => (
            <Link to={item.to} key={item.to}>
              <li
                className={`flex items-center p-2 rounded-md font-medium transition duration-300 ${
                  location.pathname === item.to ? 'bg-yellow-500 text-red-900' : 'hover:bg-red-700'
                }`}
              >
                {item.icon} {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}
