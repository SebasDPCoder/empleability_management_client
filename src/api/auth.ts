import axiosClient from './axiosClient'

type LoginCredentials = {
  email: string
  password: string
}

type LoginResponse = {
  data: {
    access_token: string,
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
  message: string   
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await axiosClient.post<LoginResponse>('/api/auth/login', credentials)
  return response.data
}