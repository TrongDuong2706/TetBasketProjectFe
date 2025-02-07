import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { Schema, schema } from 'src/utils/rules'
type FormData = Schema
export default function Register() {
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
      onSuccess: (data) => {
        toast('Đăng ký thành công')
        console.log(data)
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
    <div>
      <form noValidate onSubmit={onSubmit}>
        <Input
          name='username'
          register={register}
          type='text'
          errorMessage={errors.username?.message}
          placeholder='Username'
        />
        <Input
          name='firstName'
          register={register}
          type='text'
          errorMessage={errors.firstName?.message}
          placeholder='First Name'
        />
        <Input
          name='lastName'
          register={register}
          type='text'
          errorMessage={errors.lastName?.message}
          placeholder='Last Name'
        />
        <Input
          name='password'
          register={register}
          type='password'
          errorMessage={errors.password?.message}
          placeholder='Password'
        />
        <Input
          name='confirm_password'
          register={register}
          type='password'
          errorMessage={errors.confirm_password?.message}
          placeholder='Confirm Password'
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  )
}
