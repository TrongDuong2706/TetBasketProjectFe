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
        <i className='fas fa-user mr-2'></i>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          className='w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white'
        />
        {errorMessage && <p className='text-red-300 text-sm mt-1'>{errorMessage}</p>}
      </div>
    </div>
  )
}
