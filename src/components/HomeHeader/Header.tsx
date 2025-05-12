import React, { useContext, useEffect, useState } from 'react'
import {
  Search,
  ShoppingBag,
  Phone,
  Gift,
  Home,
  Info,
  Newspaper,
  Book,
  PhoneCall,
  ChevronDown,
  Package
} from 'lucide-react'
import SearchInput from '../SearchInput/SearchInput'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getMyInfo, LogoutAccount } from 'src/apis/auth.api'
import { getAccessTokenFromLS, getUserId, removeUserId, setUserId } from 'src/utils/auth'
import { countItemInCart } from 'src/apis/cart.api'

export default function Header() {
  const userId = getUserId()
  const navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const [cartItems, setCartItems] = useState<number>(0)

  const { setRefetchCartCount } = useContext(AppContext)

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
          removeUserId()
        },
        onError: (error) => {
          console.error('Logout failed:', error)
        }
      })
    }
  }

  // ✅ Gọi API đếm số lượng sản phẩm trong giỏ hàng
  const { data: countCartData, refetch: refetchCartCount } = useQuery({
    queryKey: ['cartItemCount', userId],
    queryFn: () => countItemInCart(userId as string),
    enabled: !!userId && isAuthenticated
  })

  useEffect(() => {
    if (countCartData?.data != null) {
      setCartItems(countCartData.data.result)
    }
  }, [countCartData])

  // ✅ Lấy thông tin người dùng
  const {
    data: userInfo,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getMyInfo,
    enabled: isAuthenticated
  })

  useEffect(() => {
    if (userInfo?.data?.result?.id) {
      setUserId(userInfo.data.result.id)
    }
  }, [userInfo])

  const userInfor = userInfo?.data.result

  useEffect(() => {
    if (setRefetchCartCount) {
      setRefetchCartCount(() => refetchCartCount)
    }
  }, [refetchCartCount, setRefetchCartCount])

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
              <span className='font-semibold'>
                Chào mừng {userInfor?.firstName} {userInfor?.lastName}!
              </span>
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
        <div
          className='relative flex items-center cursor-pointer'
          onClick={() => {
            if (isAuthenticated) {
              navigate('/Cart')
            } else {
              navigate('/login')
            }
          }}
        >
          <ShoppingBag size={40} />
          <span className='ml-1 text-sm'>{cartItems}</span>
        </div>

        {/* Icon đơn hàng */}
        <div
          className='relative flex items-center cursor-pointer ml-4'
          onClick={() => {
            if (isAuthenticated) {
              navigate('/order-list')
            } else {
              navigate('/login')
            }
          }}
        >
          <Package size={40} />
          <span className='ml-1 text-sm'>Đơn hàng</span>
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
            <a href='/productlist?categoryId=11' className='block px-4 py-2 hover:bg-red-700'>
              Hộp Quà Tết
            </a>
            <hr className='border-t border-white' />
            <a href='/productlist?categoryId=12' className='block px-4 py-2 hover:bg-red-700'>
              Giỏ Quà Tết
            </a>
            <hr className='border-t border-white' />
            <a href='/productlist?categoryId=13' className='block px-4 py-2 hover:bg-red-700'>
              Hộp Quà Cao Cấp
            </a>
            <hr className='border-t border-white' />
            <a href='/productlist?categoryId=14' className='block px-4 py-2 hover:bg-red-700'>
              Hộp Quà Doanh Nghiệp
            </a>
            <hr className='border-t border-white' />
            <a href='/productlist?categoryId=15' className='block px-4 py-2 hover:bg-red-700'>
              Quà Tết Giá Rẻ
            </a>
          </div>
        </div>
        <div className='flex justify-center gap-7 text-sm font-semibold'>
          <a href='/' className='flex items-center gap-1 text-yellow-100 hover:scale-110'>
            <Home size={16} /> TRANG CHỦ
          </a>
          <a href='/product-list' className='flex items-center gap-1 text-yellow-100 hover:scale-110'>
            <Gift size={16} /> QUÀ TẾT
          </a>
          <a href='#' className='flex items-center gap-1 text-yellow-100 hover:scale-110'>
            <Info size={16} /> GIỚI THIỆU
          </a>
          <a href='#' className='flex items-center gap-1 text-yellow-100 hover:scale-110'>
            <Newspaper size={16} /> BLOG
          </a>
          <a href='#' className='flex items-center gap-1 text-yellow-100 hover:scale-110'>
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
