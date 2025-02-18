import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Home from './pages/Home'
import HomeLayout from './layout/HomeLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import { Routes, Route } from "react-router-dom";
import AboutLuxyStore from "./components/AboutLuxyStore/AboutLuxyStore";

export default function useRouteElements() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-luxystore" element={<AboutLuxyStore />} />
    </Routes>
  );

  function ProtectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
  }

  function RejectedRoute() {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
  }

  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <HomeLayout>
          <Home />
        </HomeLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/register',
          element: <Register />
        },
        {
          path: '/login',
          element: <Login />
        }
      ]
    }
  ])
  return routeElements
  
}
