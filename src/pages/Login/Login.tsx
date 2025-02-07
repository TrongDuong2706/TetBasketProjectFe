import { useMutation } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAccount } from 'src/apis/auth.api'
import { AppContext } from 'src/contexts/app.context'
import { LoginSchema, schemaLogin } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
type FormData = LoginSchema
export default function Login() {
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
            setError('username', { type: 'manual', message: 'Username không tồn tại' })
          } else if (message.includes('Unauthenticated')) {
            setError('password', { type: 'manual', message: 'Mật khẩu chưa đúng' })
          }
        }
      }
    })
  })

  return (
    <div>
      <form noValidate onSubmit={onSubmit}>
        <p>Mời nhập tài khoản</p>
        <Input
          name='username'
          register={register}
          type='text'
          errorMessage={errors.username?.message}
          placeholder='Username'
        />
        <p>Mời nhập password</p>
        <Input
          name='password'
          register={register}
          type='password'
          errorMessage={errors.password?.message}
          placeholder='Password'
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
