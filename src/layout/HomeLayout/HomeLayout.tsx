import React, { Children } from 'react'
interface Props {
  children?: React.ReactNode
}
export default function HomeLayout({ children }: Props) {
  return <div>{children}</div>
}
