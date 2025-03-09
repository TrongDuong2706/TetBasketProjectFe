import { BasketShellResponse, CategoryResponse, CategorySingleResponse } from 'src/types/category.type'
import http from 'src/utils/http'
//Loại quà tết
export const getBasketCategory = () => http.get<CategoryResponse>('/basketcategory')

export const getOneBasketCategory = (basketCategoryId: any) =>
  http.get<CategorySingleResponse>(`/basketcategory/${basketCategoryId}`)

//Tạo BasketCategory
export const createBasketCategory = (name: string, description: string) =>
  http.post<CategorySingleResponse>('/basketcategory', {
    name,
    description
  })
//Sửa BasketCategory

export const updateBasketCategory = (basketCategoryId: number, name: string, description: string) =>
  http.put<CategorySingleResponse>(`/basketcategory/${basketCategoryId}`, {
    name,
    description
  })

//Xóa BasketCategory
export const deleteBasketCategory = (basketCategoryId: number) => http.delete(`/basketcategory/${basketCategoryId}`)

//Vỏ hàng
export const getAllBasketShell = () => http.get<BasketShellResponse>('/basketshell')
//Lấy một vỏ hàng
export const getOneBasketShell = (basketShellId: any) =>
  http.get<CategorySingleResponse>(`/basketshell/${basketShellId}`)

//Tạo một vỏ hàng
//Tạo BasketCategory
export const createBasketShell = (name: string, description: string) =>
  http.post<CategorySingleResponse>('/basketshell', {
    name,
    description
  })

//Sửa BasketCategory

export const updateBasketShell = (basketCategoryId: number, name: string, description: string) =>
  http.put<CategorySingleResponse>(`/basketshell/${basketCategoryId}`, {
    name,
    description
  })

//Xóa một vỏ hàng Shell
export const deleteBasketShell = (basketShellId: number) => http.delete(`/basketshell/${basketShellId}`)
