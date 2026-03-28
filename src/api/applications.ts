// src/api/applications.ts
import axiosClient from './axiosClient'

export type ApplicationUser = {
  id: string
  name: string
  email: string
  role: string
}

export type ApplicationVacancy = {
  id: string
  title: string
  company: string
  location: string
  modality: string
  seniority: string
  salaryRange: string
  maxApplicants: number
  isActive: boolean
  technologies: { id: string; name: string }[]
}

export type Application = {
  id: string
  userId: string
  vacancyId: string
  appliedAt: string
  user: ApplicationUser
  vacancy: ApplicationVacancy
}

type ApplicationsResponse = {
  success: boolean
  message: string
  data: Application[]
}

type ApplicationResponse = {
  success: boolean
  message: string
  data: Application
}

export async function applyToVacancy(vacancyId: string): Promise<ApplicationResponse> {
  const response = await axiosClient.post<ApplicationResponse>('/api/applications', { vacancyId })
  return response.data
}

export async function getAllApplications(): Promise<ApplicationsResponse> {
  const response = await axiosClient.get<ApplicationsResponse>('/api/applications')
  return response.data
}

export async function getMyApplications(): Promise<ApplicationsResponse> {
  const response = await axiosClient.get<ApplicationsResponse>('/api/applications/me')
  return response.data
}