import { BasketResponse, BasketSingle } from 'src/types/basket.type'
import http from 'src/utils/http'

//Lấy tất cả giỏ hàng
export const getBaskets = (page: number, size: number) =>
  http.get<BasketResponse>('/basket', { params: { page, size } })

//Lấy một giỏ hàng
export const getOneBasket = (basketId: any) => http.get<BasketSingle>(`/basket/${basketId}`)

//Tạo giỏ hàng
export const createBasket = (body: FormData) =>
  http.post('/basket', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

//update giỏ hàng
export const updateBasket = (basketId: any, body: FormData) =>
  http.put(`/basket/${basketId}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

//Xóa giỏ hàng
export const deleteBasket = (basketId: any) => http.delete(`/basket/${basketId}`)

//Lọc giỏ hàng
export const getFilterBasket = (
  page: number,
  size: number,
  name: string | null = null,
  minPrice: number | null = null,
  maxPrice: number | null = null,
  categoryId: number | null = null,
  status: number
) =>
  http.get<BasketResponse>('/basket/filter/basket', {
    params: { page, size, name, minPrice, maxPrice, categoryId, status }
  })
