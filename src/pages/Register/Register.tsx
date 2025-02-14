import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerAccount } from '../../apis/auth.api'
import { Schema, schema } from '../../utils/rules'
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa'

type FormData = Schema

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: () => {
        toast('Đăng ký thành công')
      },
      onError: (error: any) => {
        if (error.response?.data) {
          const { message } = error.response.data
          if (message.includes('User existed')) {
            setError('username', { type: 'manual', message: 'Username đã tồn tại' })
          }
        }
      }
    })
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/background.jpeg')] bg-cover bg-center relative">
      <div className='absolute inset-0 bg-black bg-opacity-20'></div>

      {/* Chia Layout thành 2 phần */}
      <div className='relative justify-center z-10 w-[90%] max-w-xl flex bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg'>
        {/* Form đăng ký */}
        <div className='w-full md:w-full p-10 overflow-auto max-h-screen'>
          <h2 className='text-3xl font-bold text-white mb-4 tracking-wide text-center'>Đăng Ký</h2>

          <form className='space-y-4' noValidate onSubmit={onSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='relative'>
                <FaUser className='absolute left-4 top-4 text-white text-lg' />
                <input
                  {...register('firstName')}
                  type='text'
                  placeholder='Tên'
                  className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
                />
                {errors.firstName && <p className='text-red-300 text-sm mt-1'>{errors.firstName.message}</p>}
              </div>

              <div className='relative'>
                <FaUser className='absolute left-4 top-4 text-white text-lg' />
                <input
                  {...register('lastName')}
                  type='text'
                  placeholder='Họ'
                  className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
                />
                {errors.lastName && <p className='text-red-300 text-sm mt-1'>{errors.lastName.message}</p>}
              </div>
            </div>

            <div className='relative'>
              <FaEnvelope className='absolute left-4 top-4 text-white text-lg' />
              <input
                {...register('email')}
                type='email'
                placeholder='Email'
                className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
              />
              {errors.email && <p className='text-red-300 text-sm mt-1'>{errors.email.message}</p>}
            </div>

            <div className='relative'>
              <FaUser className='absolute left-4 top-4 text-white text-lg' />
              <input
                {...register('username')}
                type='text'
                placeholder='Tài Khoản'
                className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
              />
              {errors.username && <p className='text-red-300 text-sm mt-1'>{errors.username.message}</p>}
            </div>

            <div className='relative'>
              <FaLock className='absolute left-4 top-4 text-white text-lg' />
              <input
                {...register('password')}
                type='password'
                placeholder='Mật khẩu'
                className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
              />
              {errors.password && <p className='text-red-300 text-sm mt-1'>{errors.password.message}</p>}
            </div>

            <div className='relative'>
              <FaLock className='absolute left-4 top-4 text-white text-lg' />
              <input
                {...register('confirm_password')}
                type='password'
                placeholder='Xác nhận mật khẩu'
                className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
              />
              {errors.confirm_password && (
                <p className='text-red-300 text-sm mt-1'>{errors.confirm_password.message}</p>
              )}
            </div>

            <button className='w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-3 rounded-full hover:scale-105 transition-transform shadow-lg'>
              Đăng Ký
            </button>
          </form>

          <p className='mt-4 text-sm text-white text-center'>
            Đã có tài khoản?{' '}
            <a href='/login' className='text-yellow-300 font-semibold hover:underline'>
              Đăng nhập ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
