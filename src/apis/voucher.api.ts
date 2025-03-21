import { listVoucherResponse, oneVoucher, voucherResponse } from 'src/types/voucher.type'
import http from 'src/utils/http'

export const applyVoucher = (body: { voucherCode: string; orderAmount: number }) =>
  http.post<voucherResponse>('/voucher/apply', body)
export const getAllVoucher = () => http.get<listVoucherResponse>('/voucher')

export const createVoucher = (body: {
  voucherCode: string
  name: string
  discountPercentage: number
  fixedDiscount: number
  expiryDate: Date
  status: string
  minPurchaseAmount: number
  quantity: number
}) => http.post<oneVoucher>('/voucher', body)
