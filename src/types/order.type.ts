import { Image } from './image.type'
import { SuccessResponse } from './utils.type'

export type OrderResponse = SuccessResponse<{
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  elements: Order[]
}>

export interface Order {
  orderId: number
  userId: String
  totalAmount: number
  finalAmount: number
  voucherCode: String
  discountAmount: number
  shippingFee: number
  orderStatus: String
  orderDate: String
  fullName: String
  email: String
  phoneNumber: String
  address: String
}

export type OrderDetail = {
  id: number
  basketId: number
  name: String
  price: number
  quantity: number
  images: Image[]
}

export type OrderDetailResponse = SuccessResponse<OrderDetail[]>

export type Orders = {
  orderId: number
  userId: String
  totalAmount: number
  finalAmount: number
  voucherCode: String
  discountAmount: number
  shippingFee: number
  orderStatus: String
  orderDate: String
  fullName: String
  email: String
  phoneNumber: String
  address: String
}

export type OneOrderResponse = SuccessResponse<Orders>
