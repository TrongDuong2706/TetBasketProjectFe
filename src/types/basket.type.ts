import { Image } from './image.type'
import { SuccessResponse } from './utils.type'

export type BasketResponse = SuccessResponse<{
  totalItems: number
  totalPages: number
  currentPage: number
  pageSize: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  elements: Basket[]
}>

export interface Basket {
  id: number
  description: String
  name: String
  price: number
  quantity: number
  categoryId: number
  status: number
  createAt: String
  basketShellId: number
  images: Image[]
  itemNames: string[]
}

//Lấy một basket
export type BasketItem = {
  id: number
  description: String
  name: String
  price: number
  quantity: number
  categoryId: number
  status: number
  createAt: String
  basketShellId: number
  images: Image[]
  itemNames: string[]
}

export type BasketSingle = SuccessResponse<BasketItem>
