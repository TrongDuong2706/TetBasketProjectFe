import { Image } from './image.type'
import { SuccessResponse } from './utils.type'

export type addToCartResponse = SuccessResponse<{
  id: number
  items: Item[]
}>

export interface Item {
  id: number
  basketId: number
  name: string
  price: number
  quantity: number
}

//Lấy một basket
export type cartItems = {
  id: number
  basketId: number
  name: string
  price: number
  quantity: number
  imageUrls: string
}

export type getAllCartItemResponse = SuccessResponse<cartItems[]>
