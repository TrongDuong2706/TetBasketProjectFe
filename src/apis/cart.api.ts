import { addToCartResponse, getAllCartItemResponse } from 'src/types/cart.type'
import http from 'src/utils/http'

export const addToCart = (body: { userId: string; basketId: number; quantity: number }) =>
  http.post<addToCartResponse>('/cart', body)
export const getAllItemInCart = (userId: string) => http.get<getAllCartItemResponse>(`/cart/${userId}`)
