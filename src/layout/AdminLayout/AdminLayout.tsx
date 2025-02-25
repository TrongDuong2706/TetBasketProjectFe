import React from 'react'
import Header from 'src/components/AdminComponents/Header'
import SideBar from 'src/components/AdminComponents/SideBar'
interface Props {
  children?: React.ReactNode
}
export default function AdminLayout({ children }: Props) {
  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <SideBar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='main-content p-4'>{children}</div>
      </div>
    </div>
  )
}
