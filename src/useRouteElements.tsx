import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import Home from './pages/Home'
import HomeLayout from './layout/HomeLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminLayout from './layout/AdminLayout'
import AdminBasket from './pages/Admin/AdminBasket'
import AdminAddBasket from './pages/Admin/AdminAddBasket'
import AdminEditBasket from './pages/Admin/AdminEditBasket'

export default function useRouteElements() {
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
    },
    {
      path: '/admin',
      element: (
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      )
    },
    {
      path: '/admin/basket',
      element: (
        <AdminLayout>
          <AdminBasket />
        </AdminLayout>
      )
    },
    {
      path: '/admin/add-basket',
      element: (
        <AdminLayout>
          <AdminAddBasket />
        </AdminLayout>
      )
    },
    {
      path: '/admin/edit-basket/:basketId',
      element: (
        <AdminLayout>
          <AdminEditBasket />
        </AdminLayout>
      )
    }
  ])
  return routeElements
}
