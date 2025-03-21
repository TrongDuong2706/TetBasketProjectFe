import { SuccessResponse } from './utils.type'

export type voucherResponse = SuccessResponse<{
  voucherCode: string
  message: string
  discountAmount: number
  newOrderAmount: number
}>

export type voucher = {
  id: number
  voucherCode: string
  name: string
  discountPercentage: number
  fixedDiscount: number
  expiryDate: string
  status: string
  minPurchaseAmount: number
  quantity: number
}

export type oneVoucher = SuccessResponse<voucher>
export type listVoucherResponse = SuccessResponse<voucher[]>
