import React, { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { loginAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { LoginSchema, schemaLogin } from 'src/utils/rules'
import { FaUser, FaLock } from 'react-icons/fa'
import Input from 'src/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
type FormData = LoginSchema

export default function LoginPage() {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin)
  })

  //CALL API LOGIN
  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        toast('Đăng nhập thành công')
        navigate('/')
        setIsAuthenticated(true)
        console.log(data)
      },
      onError: (error: any) => {
        if (error.response?.data) {
          const { message } = error.response.data

          // Không gọi toast.error(message) để tránh hiển thị lỗi chung
          if (message.includes('User not existed')) {
            setError('username', { type: 'manual', message: 'Tài khoản không tồn tại' })
          } else if (message.includes('Unauthenticated')) {
            setError('password', { type: 'manual', message: 'Mật khẩu chưa đúng' })
          }
        }
      }
    })
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/background.jpeg')] bg-cover bg-center relative">
      <div className='absolute inset-0 bg-black bg-opacity-20'></div>

      <div className='relative z-10 backdrop-blur-xl bg-white/10 border border-white/30 p-8 rounded-2xl shadow-lg w-96 text-center'>
        <h2 className='text-3xl font-bold text-white mb-5 tracking-wide'>Đăng Nhập</h2>

        <form className='space-y-4' onSubmit={onSubmit}>
          <div className='relative'>
            <FaUser className='absolute left-6 top-3 text-white text-lg' />
            <Input
              name='username'
              register={register}
              type='text'
              placeholder='Tài Khoản'
              rules={{ required: 'Vui lòng nhập tài khoản' }}
              errorMessage={errors.username?.message}
            />
          </div>

          <div className='relative'>
            <FaLock className='absolute left-6 top-3 text-white text-lg' />
            <Input
              name='password'
              register={register}
              type='password'
              placeholder='Mật khẩu'
              rules={{ required: 'Vui lòng nhập mật khẩu' }}
              errorMessage={errors.password?.message}
            />
          </div>

          <button className='w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-3 rounded-full hover:scale-105 transition-transform shadow-md'>
            Đăng Nhập
          </button>
        </form>

        <p className='mt-4 text-sm text-white'>
          Chưa có tài khoản?{' '}
          <span
            className='text-yellow-300 cursor-pointer font-semibold hover:underline'
            onClick={() => navigate('/register')}
          >
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  )
}
