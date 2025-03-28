import { OneOrderResponse, OrderDetailResponse, OrderResponse } from 'src/types/order.type'
import http from 'src/utils/http'

//Lọc giỏ hàng
export const getALLOrders = (
  page: number,
  size: number,
  fullName: string | null = null,
  minPrice: number | null = null,
  maxPrice: number | null = null
) =>
  http.get<OrderResponse>('/order', {
    params: { page, size, fullName, minPrice, maxPrice }
  })

export const getAllBasketByOrderId = (orderId: any) => http.get<OrderDetailResponse>(`/order/${orderId}`)

export const getOneOrder = (orderId: any) => http.get<OneOrderResponse>(`/order/order-detail/${orderId}`)

export const createOrder = (body: {
  userId: string
  totalAmount: number
  voucherCode: string
  fullName: string
  email: string
  phoneNumber: string
  address: string
  note: string
}) => http.post<OneOrderResponse>('/order', body)

export const getAllOrderByUserId = (page: number, size: number, userId: string) =>
  http.get<OrderResponse>(`/order/check/${userId}`, { params: { page, size } })

export const changeOrderStatus = (orderId: number) => http.put<OneOrderResponse>(`/order/${orderId}`)
