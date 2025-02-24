import { SuccessResponse } from './utils.type'

export type CategoryResponseItem = {
  id: number
  description: String
  name: String
}

export type CategoryResponse = SuccessResponse<CategoryResponseItem[]>
export type CategorySingleResponse = SuccessResponse<CategoryResponseItem>

//Vỏ hàng

export type BasketShell = {
  id: number
  description: String
  name: String
}

export type BasketShellResponse = SuccessResponse<BasketShell[]>
