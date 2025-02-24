import { BasketShellResponse, CategoryResponse, CategorySingleResponse } from 'src/types/category.type'
import http from 'src/utils/http'

export const getBasketCategory = () => http.get<CategoryResponse>('/basketcategory')

export const getOneBasketCategory = (basketCategoryId: number) =>
  http.get<CategorySingleResponse>(`/basketcategory/${basketCategoryId}`)

//Vỏ hàng
export const getAllBasketShell = () => http.get<BasketShellResponse>('/basketshell')
//Lấy một vỏ hàng
export const getOneBasketShell = (basketShellId: number) =>
  http.get<CategorySingleResponse>(`/basketshell/${basketShellId}`)
