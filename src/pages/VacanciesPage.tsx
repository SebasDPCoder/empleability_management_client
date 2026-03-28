// src/pages/VacanciesPage.tsx
import { useState, useEffect } from 'react'
import { getVacancies } from '../api/vacancies'
import type { Vacancy } from '../api/vacancies'
import type { Application } from '../api/applications'
import { applyToVacancy, getMyApplications } from '../api/applications'
import LoadingSpinner from '../components/LoadingSpinner'


function VacanciesPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [applying, setApplying] = useState<string | null>(null) // id de la vacante en proceso
  const [error, setError] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const [vacanciesRes, applicationsRes] = await Promise.all([
        getVacancies(),
        getMyApplications(),
      ])
      setVacancies(vacanciesRes.data)
      setApplications(applicationsRes.data)
    } catch {
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const isApplied = (vacancyId: string): boolean => {
    return applications.some((app) => app.vacancy.id === vacancyId)
  }

  const handleApply = async (vacancyId: string) => {
    setApplying(vacancyId)
    setError('')
    setSuccessMsg('')
    try {
      await applyToVacancy(vacancyId)
      setSuccessMsg('¡Te postulaste exitosamente!')
      await fetchData()
    } catch (err: any) {
      const msg = err?.response?.data?.message
      if (err?.response?.status === 409) {
        setError('Ya estás postulado a esta vacante.')
      } else if (err?.response?.status === 400) {
        setError(msg || 'Sin cupo disponible o alcanzaste el límite de postulaciones.')
      } else {
        setError('Error al postularse. Intenta de nuevo.')
      }
    } finally {
      setApplying(null)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vacantes disponibles</h1>
          <p className="text-sm text-gray-500 mt-1">Puedes aplicar a máximo 3 vacantes</p>
        </div>
      </div>

      {/* Contador de postulaciones */}
      <div className="flex gap-2 items-center mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-2 w-16 rounded-full ${
              i < applications.length ? 'bg-blue-500' : 'bg-gray-200'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">{applications.length}/3 postulaciones usadas</span>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3 mb-4">
          {successMsg}
        </div>
      )}

      {/* Lista de vacantes */}
      {vacancies.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No hay vacantes disponibles.</p>
      ) : (
        vacancies.map((vacancy) => {
          const applied = isApplied(vacancy.id)
          const isLoading = applying === vacancy.id
          const limitReached = applications.length >= 3

          return (
            <div key={vacancy.id} className="border border-gray-200 rounded-xl p-5 mb-3 bg-white shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-gray-800">{vacancy.title}</h3>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {vacancy.seniority}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                      {vacancy.modality}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{vacancy.company} · {vacancy.location}</p>
                  <p className="text-sm text-gray-600 mt-2">{vacancy.description}</p>
                  <p className="text-sm text-blue-600 font-medium mt-2">{vacancy.salaryRange}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {vacancy.technologies.map((tech) => (
                      <span key={tech.id} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón aplicar */}
                <div className="flex flex-col items-end gap-2 min-w-27.5">
                  <p className="text-xs text-gray-400">{vacancy.maxApplicants} cupos</p>
                  {applied ? (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-lg font-medium">
                      ✓ Aplicado
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApply(vacancy.id)}
                      disabled={isLoading || limitReached}
                      className={`text-xs px-4 py-1.5 rounded-lg font-medium transition ${
                        limitReached
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                      }`}
                    >
                      {isLoading ? 'Aplicando...' : limitReached ? 'Límite alcanzado' : 'Aplicar'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default VacanciesPage