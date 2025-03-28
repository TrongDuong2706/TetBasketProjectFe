import { addToCartResponse, getAllCartItemResponse } from 'src/types/cart.type'
import http from 'src/utils/http'

export const addToCart = (body: { userId: string; basketId: number; quantity: number }) =>
  http.post<addToCartResponse>('/cart', body)
export const getAllItemInCart = (userId: string) => http.get<getAllCartItemResponse>(`/cart/${userId}`)
export const updateItemInCartQuantity = (body: { userId: string; basketId: number; quantityChange: number }) =>
  http.put<getAllCartItemResponse>('/cart', body)
export const deleteItemInCart = (userId: string, basketId: number) =>
  http.delete<getAllCartItemResponse>(`/cart/${userId}/items/${basketId}`)

export const countItemInCart = (userId: string) =>
  http.get<number>(`/cart/count`, {
    params: { userId }
  })
