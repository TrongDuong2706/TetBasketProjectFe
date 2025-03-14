import React, { useContext, useState } from 'react'
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
  ChevronDown
} from 'lucide-react'
import SearchInput from '../SearchInput/SearchInput'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import { LogoutAccount } from 'src/apis/auth.api'
import { getAccessTokenFromLS } from 'src/utils/auth'
import AddToCart from '../AddToCart/AddToCart'

export default function Header() {
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)

  const logOutAccountMutation = useMutation({
    mutationFn: (token: any) => LogoutAccount({ token })
  })

  const handleLogout = () => {
    const tokenWithPrefix = getAccessTokenFromLS()
    const token = tokenWithPrefix ? tokenWithPrefix.replace('Bearer ', '') : null

    if (token) {
      logOutAccountMutation.mutate(token, {
        onSuccess: () => {
          navigate('/')
          setIsAuthenticated(false)
        },
        onError: (error) => {
          console.error('Logout failed:', error)
        }
      })
    }
  }

  const [cartItems, setCartItems] = useState<number>(0)

  const handleAddToCart = () => {
    setCartItems(cartItems + 1)
  }

  return (
    <header className='bg-[#8B1E15] text-white'>
      <div className='max-w-8xl mx-2 flex justify-center items-center px-4 py-2 text-sm gap-80'>
        <span className='font-medium tracking-wide text-yellow-200'>
          Tết đủ đầy, quà tinh tế - Luxy Store trao tay!
        </span>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <PhoneCall size={14} className='text-yellow-300' />
            <span className='font-semibold'>0967 892 186</span>
            <span>|</span>
          </div>

          {isAuthenticated ? (
            <div className='flex items-center gap-4'>
              <span className='font-semibold'>Chào mừng khách hàng!</span>
              <button
                onClick={handleLogout}
                className='px-4 py-1 text-sm font-medium bg-red-500 rounded hover:bg-red-600'
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className='flex items-center gap-4'>
              <a href='/login' className='hover:text-yellow-200'>
                Đăng nhập
              </a>
              <span>|</span>
              <a href='/register' className='hover:text-yellow-200'>
                Đăng ký
              </a>
            </div>
          )}
        </div>
      </div>

      <div className='flex justify-center gap-20 items-center px-6 py-2 bg-[#A92D22]'>
        <img
          src='/public/images/logo_luxy.jpg'
          alt='Luxy Store'
          className='w-20 cursor-pointer'
          onClick={() => navigate('/')}
        />
        <div className='mx-4 w-[42%]'>
          <SearchInput />
        </div>
        <div className='flex items-center gap-4'>
          <div className='relative flex items-center'>
            <Heart size={18} />
            <span className='absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full'>0</span>
          </div>
          <div
            className='relative flex items-center cursor-pointer'
            onClick={() => {
              navigate('/Cart')
            }}
          >
            <ShoppingBag size={18} />
            <span className='ml-1 text-sm'>{cartItems} / 0₫</span>
          </div>
          {/* Add the AddToCart component */}
        </div>
      </div>

      <nav className='bg-[#A92D22] w-full pt-2 pb-3 flex justify-center gap-20'>
        <div className='relative group z-20'>
          <button className='bg-[#D73E29] font-semibold text-sm px-5 py-2 rounded flex items-center gap-1'>
            <Gift size={16} /> DANH MỤC SẢN PHẨM
            <ChevronDown size={16} />
          </button>
          <div className='absolute w-full hidden group-hover:block bg-red-600 text-white mt-1 rounded shadow-lg top-8'>
            <hr className='border-t border-white' />
            <a href='#' className='block px-4 py-2 transition-transform ease-in-out duration-300 hover:bg-red-700'>
              Hộp Quà Tết
            </a>
            <hr className='border-t border-white' />
            <a href='#' className='block px-4 py-2 transition-transform ease-in-out duration-300 hover:bg-red-700'>
              Giỏ Quà Tết
            </a>
            <hr className='border-t border-white' />
            <a href='#' className='block px-4 py-2 transition-transform ease-in-out duration-300 hover:bg-red-700'>
              Hộp Quà Cao Cấp
            </a>
            <hr className='border-t border-white' />
            <a href='#' className='block px-4 py-2 transition-transform ease-in-out duration-300 hover:bg-red-700'>
              Hộp Quà Doanh Nghiệp
            </a>
            <hr className='border-t border-white' />
            <a href='#' className='block px-4 py-2 transition-transform ease-in-out duration-300 hover:bg-red-700'>
              Quà Tết Giá Rẻ
            </a>
          </div>
        </div>
        <div className='flex justify-center gap-7 text-sm font-semibold'>
          <a
            href='#'
            className='flex items-center gap-1 text-yellow-100 transition-transform transform hover:scale-110'
          >
            <Home size={16} /> TRANG CHỦ
          </a>
          <a
            href='#'
            className='flex items-center gap-1 text-yellow-100 transition-transform transform hover:scale-110'
          >
            <Gift size={16} /> QUÀ TẾT
          </a>
          <a
            href='#'
            className='flex items-center gap-1 text-yellow-100 transition-transform transform hover:scale-110'
          >
            <Info size={16} /> GIỚI THIỆU
          </a>
          <a
            href='#'
            className='flex items-center gap-1 text-yellow-100 transition-transform transform hover:scale-110'
          >
            <Newspaper size={16} /> BLOG
          </a>
          <a
            href='#'
            className='flex items-center gap-1 text-yellow-100 transition-transform transform hover:scale-110'
          >
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
