import { AxiosResponse } from 'axios'
import { AuthResponse, CreatePasswordResponse, LoginResponse, LogoutResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

// API đăng ký
export const registerAccount = (body: { username: string; firstName: string; password: string; lastName: string }) =>
  http.post<AuthResponse>('/users', body)

// API đăng nhập
export const loginAccount = (body: { username: string; password: string }) =>
  http.post<AuthResponse>('/auth/token', body)

// API getInfo
export const getMyInfo = () => http.get<AuthResponse>('/users/myInfo')

//API Logout
export const LogoutAccount = (body: { token: string }) => http.post<LogoutResponse>('/auth/logout', body)

//API lấy tổng số user
export const getTotalUser = () => http.get('/users/totalUsers')
