import axiosClient from './axiosClient'

export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'gestor' | 'coder'
}

type UsersResponse = {
  success: boolean
  message: string
  data: User[]
}

export async function getAllUsers(): Promise<UsersResponse> {
  const response = await axiosClient.get<UsersResponse>('/api/users')
  return response.data
}