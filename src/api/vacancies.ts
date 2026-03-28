// src/api/vacancies.ts
import axiosClient from './axiosClient'

export type Technology = {
  id: string
  name: string
}

export type Vacancy = {
  id: string
  title: string
  description: string
  seniority: string
  softSkills: string
  location: string
  modality: 'presencial' | 'remoto' | 'hibrido'
  salaryRange: string
  company: string
  maxApplicants: number
  isActive: boolean
  createdAt: string
  technologies: Technology[]
}

export type VacancyForm = {
  title: string
  description: string
  seniority: string
  softSkills: string
  location: string
  modality: string
  salaryRange: string
  company: string
  maxApplicants: number
  technologies: string[]
  isActive?: boolean
}

type VacanciesResponse = {
  success: boolean
  message: string
  data: Vacancy[]
}

type VacancyResponse = {
  success: boolean
  message: string
  data: Vacancy
}

export async function getVacancies(): Promise<VacanciesResponse> {
  const response = await axiosClient.get<VacanciesResponse>('/api/vacancies')
  return response.data
}

export async function getAllVacancies(): Promise<VacanciesResponse> {
  const response = await axiosClient.get<VacanciesResponse>('/api/vacancies/all')
  return response.data
}

export async function createVacancy(data: VacancyForm): Promise<VacancyResponse> {
  const response = await axiosClient.post<VacancyResponse>('/api/vacancies', data)
  return response.data
}

export async function updateVacancy(id: string, data: Partial<VacancyForm>): Promise<VacancyResponse> {
  const response = await axiosClient.patch<VacancyResponse>(`/api/vacancies/${id}`, data)
  return response.data
}

export async function deleteVacancy(id: string): Promise<void> {
  await axiosClient.delete(`/api/vacancies/${id}`)
}