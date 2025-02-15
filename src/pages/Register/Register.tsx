import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerAccount } from '../../apis/auth.api'
import { Schema, schema } from '../../utils/rules'
import { FaUser, FaEnvelope, FaLock, FaRegUserCircle, FaUserCircle } from 'react-icons/fa'
import Input from 'src/components/Input'

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
            setError('username', { type: 'manual', message: 'Tài khoản đã tồn tại' })
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
        <div className='w-full md:w-full px-10 pt-5 pb-6 overflow-auto max-h-screen'>
          <h2 className='text-3xl font-bold text-white mb-4 tracking-wide text-center'>Đăng Ký</h2>

          <form className='space-y-3' noValidate onSubmit={onSubmit}>
            <div className='grid grid-cols-2 gap-4'>
              <div className='relative'>
                <FaUser className='absolute left-6 top-3 text-white text-lg' />
                <Input
                  name='firstName'
                  register={register}
                  type='text'
                  errorMessage={errors.firstName?.message}
                  placeholder='Họ'
                />
              </div>

              <div className='relative'>
                <FaUser className='absolute left-6 top-3 text-white text-lg' />
                <Input
                  name='lastName'
                  register={register}
                  type='text'
                  errorMessage={errors.lastName?.message}
                  placeholder='Tên'
                />
              </div>
            </div>

            <div className='relative'>
              <FaEnvelope className='absolute left-6 top-3 text-white text-lg' />
              <Input
                name='email'
                register={register}
                type='email'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
            </div>

            <div className='relative'>
              <FaUserCircle className='absolute left-6 top-3 text-white text-lg' />
              <Input
                name='username'
                register={register}
                type='text'
                errorMessage={errors.username?.message}
                placeholder='Tài khoản'
              />
            </div>

            <div className='relative'>
              <FaLock className='absolute left-6 top-3 text-white text-lg' />
              <Input
                name='password'
                register={register}
                type='password'
                errorMessage={errors.password?.message}
                placeholder='Mật khẩu'
              />
            </div>

            <div className='relative'>
              <FaLock className='absolute left-6 top-3 text-white text-lg' />
              <Input
                name='confirm_password'
                register={register}
                type='password'
                errorMessage={errors.confirm_password?.message}
                placeholder='Nhập lại mật khẩu'
              />
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
