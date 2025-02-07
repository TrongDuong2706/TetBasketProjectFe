import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  name: string
}
export default function Input({ type, errorMessage, name, placeholder, register, rules }: Props) {
  return (
    <div>
      <div>
        <label className='block text-gray-700'>
          <i className='fas fa-user mr-2'></i>
          <input type={type} placeholder={placeholder} {...register(name, rules)} />
        </label>
        <div className='text-teal-600 text-sm mt-1 pl-2'>{errorMessage}</div>
      </div>
    </div>
  )
}
