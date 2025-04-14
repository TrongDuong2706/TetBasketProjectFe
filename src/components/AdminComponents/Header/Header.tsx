import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { FaBell, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { LogoutAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { getAccessTokenFromLS, removeUserId } from 'src/utils/auth'

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
          setIsAuthenticated(false)
          removeUserId()
          navigate('/login')
        },
        onError: (error) => {
          console.error('Logout failed:', error)
        }
      })
    }
  }

  return (
    <div className='header bg-white p-4 shadow-md flex justify-between items-center'>
      <h1 className='text-lg font-semibold text-gray-800'>Dashboard</h1>
      <div className='flex items-center space-x-4'>
        <FaBell className='text-gray-500 hover:text-red-500 cursor-pointer transition duration-300' />
        <FaUserCircle className='text-gray-500 text-2xl hover:text-red-500 cursor-pointer transition duration-300' />
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className='text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md transition duration-300'
          >
            Đăng xuất
          </button>
        )}
      </div>
    </div>
  )
}
