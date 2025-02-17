import React from 'react'
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  Gift,
  Home,
  Info,
  Newspaper,
  Book,
  PhoneCall,
  ArrowDown,
  ChevronDown
} from 'lucide-react'

export default function Header() {
  return (
    <header className='bg-[#8B1E15] text-white'>
      {/* Thanh trên cùng */}
      <div className='max-w-6xl mx-2 flex justify-evenly items-center px-6 py-2 text-xs gap-40'>
        {/* Slogan */}
        <span className='font-medium tracking-wide text-yellow-200'>
          Tết đủ đầy, quà tinh tế - Luxy Store trao tay!
        </span>

        {/* Số điện thoại */}
        <div className='flex items-center gap-2'>
          <PhoneCall size={14} className='text-yellow-300' />
          <span className='font-semibold'>0967 892 186</span>
        </div>
      </div>

      {/* Logo + Tìm kiếm + Giỏ hàng */}
      <div className='flex justify-center items-center px-6 py-2 bg-[#A92D22]'>
        {/* Logo */}
        <img src='/public/images/logo_test.png' alt='Luxy Store' className='w-14' />

        {/* Ô tìm kiếm */}
        <div className='mx-4 w-[50%]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm'
              className='w-full py-1 pl-4 pr-8 rounded bg-[#F5E1C0] text-black text-sm focus:outline-none focus:ring-0'
            />
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600' size={16} />
          </div>
        </div>

        {/* Yêu thích + Giỏ hàng */}
        <div className='flex items-center gap-4'>
          <div className='relative flex items-center'>
            <Heart size={14} />
            <span className='absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full'>0</span>
          </div>
          <div className='relative flex items-center'>
            <ShoppingBag size={14} />
            <span className='ml-1 text-sm'>0 / 0₫</span>
          </div>
        </div>
      </div>

      {/* Menu điều hướng */}
      <nav className='bg-[#A92D22] py-2 flex justify-center gap-10'>
        <button className='bg-[#D73E29] font-semibold text-xs px-7 py-1 rounded flex items-center gap-1'>
          <span className='flex items-center gap-1'>
            <Gift size={14} />
            DANH MỤC
          </span>
          <span>
            <ChevronDown size={12} />
          </span>
        </button>
        <div className='flex justify-center gap-4 text-xs font-semibold'>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Home size={14} /> TRANG CHỦ
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Gift size={14} /> QUÀ TẾT
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Info size={14} /> GIỚI THIỆU
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Newspaper size={14} /> BLOG
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Phone size={14} /> LIÊN HỆ
          </a>
        </div>
        <button className='bg-[#F5E1C0] text-xs font-semibold text-black px-3 py-1 rounded flex items-center gap-1'>
          <Book size={14} /> CATALOGUE
        </button>
      </nav>
    </header>
  )
}
