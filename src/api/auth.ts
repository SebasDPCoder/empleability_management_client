import axiosClient from './axiosClient'

type LoginCredentials = {
  email: string
  password: string
}

type RegisterData = {
  name: string
  email: string
  password: string
}

type BaseUser = {
  id: string
  name: string
  email: string
  role: string
}

type LoginResponse = {
  data: {
    access_token: string,
    user: BaseUser
  }
  message: string   
}

type RegisterResponse = {
  data: BaseUser
  message: string
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>('/api/auth/login', credentials)
  return response.data
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await axiosClient.post<RegisterResponse>('/api/auth/register', data)
  return response.data
}