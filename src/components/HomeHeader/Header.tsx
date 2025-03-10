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
      <div className='max-w-8xl mx-2 flex justify-center items-center px-4 py-2 text-sm gap-96'>
        {/* Slogan */}
        <span className='font-medium tracking-wide text-yellow-200'>
          Tết đủ đầy, quà tinh tế - Luxy Store trao tay!
        </span>

        <div className='flex items-center gap-4'>
          {/* Số điện thoại */}
          <div className='flex items-center gap-2'>
            <PhoneCall size={14} className='text-yellow-300' />
            <span className='font-semibold'>0967 892 186</span>
          </div>

          {/* Đăng nhập / Đăng ký */}
          <div className='flex items-center gap-4'>
            <a href='/login' className='hover:text-yellow-200'>
              Đăng nhập
            </a>
            <span>|</span>
            <a href='/register' className='hover:text-yellow-200'>
              Đăng ký
            </a>
          </div>
        </div>
      </div>

      {/* Logo + Tìm kiếm + Giỏ hàng */}
      <div className='flex justify-center items-center px-6 py-2 bg-[#A92D22]'>
        {/* Logo */}
        <img src='/public/images/logo_luxy.jpg' alt='Luxy Store' className='w-20' />

        {/* Ô tìm kiếm */}
        <div className='mx-4 w-[50%]'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Tìm kiếm sản phẩm'
              className='w-full py-2 pl-4 pr-8 rounded bg-[#feffea] text-black text-sm focus:outline-none focus:ring-0'
            />
            <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800' size={16} />
          </div>
        </div>

        {/* Yêu thích + Giỏ hàng */}
        <div className='flex items-center gap-4'>
          <div className='relative flex items-center'>
            <Heart size={18} />
            <span className='absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full'>0</span>
          </div>
          <div className='relative flex items-center'>
            <ShoppingBag size={18} />
            <span className='ml-1 text-sm'>0 / 0₫</span>
          </div>
        </div>
      </div>

      {/* Menu điều hướng */}
      <nav className='bg-[#A92D22] w-full pt-2 pb-3 flex justify-center gap-20'>
        <button className='bg-[#D73E29] font-semibold text-sm px-7 py-1 rounded flex items-center gap-1'>
          <span className='flex items-center gap-1'>
            <Gift size={16} />
            DANH MỤC
          </span>
          <span>
            <ChevronDown size={16} />
          </span>
        </button>
        <div className='flex justify-center gap-7 text-sm font-semibold'>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Home size={16} /> TRANG CHỦ
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Gift size={16} /> QUÀ TẾT
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Info size={16} /> GIỚI THIỆU
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Newspaper size={16} /> BLOG
          </a>
          <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
            <Phone size={16} /> LIÊN HỆ
          </a>
        </div>
        <button className='bg-[#F5E1C0] text-xs font-semibold text-black px-3 py-1 rounded flex items-center gap-1'>
          <Book size={16} /> CATALOGUE
        </button>
      </nav>
    </header>
  )
}
