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
import AdminRoute from './components/AdminRoute/AdminRoute'
import ListOrder from './pages/Admin/AdminOrders/ListOrder'
import OrderDetail from './pages/Admin/AdminOrders/OrderDetail'
import ListBasketCategory from './pages/Admin/AdminBasketCategory/ListBasketCategory'
import ListBasketShell from './pages/Admin/AdminBasketShell/ListBasketShell'
import AddBasketCategory from './pages/Admin/AdminBasketCategory/AddBasketCategory'
import EditBasketCategory from './pages/Admin/AdminBasketCategory/EditBasketCategory'
import AddBasketShell from './pages/Admin/AdminBasketShell/AddBasketShell'
import EditBasketShell from './pages/Admin/AdminBasketShell/EditBasketShell'
import Cart from './pages/Cart/Cart'
import DetailProduct from './pages/DetailProduct/DetailProduct'
import ProductList from './pages/ProductList/ProductList'

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
      path: '/cart',
      index: true,
      element: (
        <Cart />
      )
    },
    {
      path: '/productList',
      index: true,
      element: (
        <ProductList />
      )
    },
    {
      path: '/product/:basketId',
      element: (
        <DetailProduct />
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
        },
        
      ]
    },
    {
      path: '/admin',
      element: <AdminRoute />, // Đảm bảo điều hướng đúng
      children: [
        {
          path: '',
          element: (
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          )
        },
        {
          path: 'basket',
          element: (
            <AdminLayout>
              <AdminBasket />
            </AdminLayout>
          )
        },
        {
          path: 'add-basket',
          element: (
            <AdminLayout>
              <AdminAddBasket />
            </AdminLayout>
          )
        },
        {
          path: 'edit-basket/:basketId',
          element: (
            <AdminLayout>
              <AdminEditBasket />
            </AdminLayout>
          )
        },
        {
          path: 'orders',
          element: (
            <AdminLayout>
              <ListOrder />
            </AdminLayout>
          )
        },
        {
          path: 'orders/:orderId',
          element: (
            <AdminLayout>
              <OrderDetail />
            </AdminLayout>
          )
        },
        {
          path: 'basket-category',
          element: (
            <AdminLayout>
              <ListBasketCategory />
            </AdminLayout>
          )
        },
        {
          path: 'basket-shell',
          element: (
            <AdminLayout>
              <ListBasketShell />
            </AdminLayout>
          )
        },
        {
          path: 'add-basket-category',
          element: (
            <AdminLayout>
              <AddBasketCategory />
            </AdminLayout>
          )
        },
        {
          path: 'basket-category/edit/:basketCategoryId',
          element: (
            <AdminLayout>
              <EditBasketCategory />
            </AdminLayout>
          )
        },
        {
          path: 'add/basket-shell',
          element: (
            <AdminLayout>
              <AddBasketShell />
            </AdminLayout>
          )
        },
        {
          path: 'basket-shell/edit/:basketShellId',
          element: (
            <AdminLayout>
              <EditBasketShell />
            </AdminLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}
