// src/pages/ApplicationsPage.tsx
import { useState, useEffect } from 'react'
import { getAllApplications } from '../api/applications'
import type { Application } from '../api/applications'
import LoadingSpinner from '../components/LoadingSpinner'

// Agrupa las postulaciones por vacante
type GroupedVacancy = {
  vacancyId: string
  title: string
  company: string
  location: string
  modality: string
  seniority: string
  salaryRange: string
  maxApplicants: number
  isActive: boolean
  technologies: { id: string; name: string }[]
  applicants: Application[]
}

function groupByVacancy(applications: Application[]): GroupedVacancy[] {
  const map = new Map<string, GroupedVacancy>()

  applications.forEach((app) => {
    if (!map.has(app.vacancyId)) {
      map.set(app.vacancyId, {
        vacancyId: app.vacancyId,
        title: app.vacancy.title,
        company: app.vacancy.company,
        location: app.vacancy.location,
        modality: app.vacancy.modality,
        seniority: app.vacancy.seniority,
        salaryRange: app.vacancy.salaryRange,
        maxApplicants: app.vacancy.maxApplicants,
        isActive: app.vacancy.isActive,
        technologies: app.vacancy.technologies,
        applicants: [],
      })
    }
    map.get(app.vacancyId)!.applicants.push(app)
  })

  return Array.from(map.values())
}

function ApplicationsPage() {
  const [grouped, setGrouped] = useState<GroupedVacancy[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    getAllApplications()
      .then((res) => setGrouped(groupByVacancy(res.data)))
      .catch(() => setError('Error al cargar las postulaciones'))
      .finally(() => setLoading(false))
  }, [])

  const toggleExpand = (vacancyId: string) => {
    setExpanded(expanded === vacancyId ? null : vacancyId)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-blue-700">{grouped.length}</p>
          <p className="text-xs text-blue-500 mt-1">Vacantes con postulaciones</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-700">
            {grouped.reduce((acc, g) => acc + g.applicants.length, 0)}
          </p>
          <p className="text-xs text-green-500 mt-1">Total postulaciones</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-purple-700">
            {new Set(grouped.flatMap((g) => g.applicants.map((a) => a.userId))).size}
          </p>
          <p className="text-xs text-purple-500 mt-1">Coders únicos</p>
        </div>
      </div>

      {/* Lista agrupada por vacante */}
      {grouped.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No hay postulaciones aún.</p>
      ) : (
        grouped.map((group) => (
          <div key={group.vacancyId} className="border border-gray-200 rounded-xl mb-3 bg-white shadow-sm overflow-hidden">

            {/* Cabecera de la vacante */}
            <button
              onClick={() => toggleExpand(group.vacancyId)}
              className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-gray-800">{group.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    group.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                  }`}>
                    {group.isActive ? 'Activa' : 'Inactiva'}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {group.seniority}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{group.company} · {group.location} · {group.modality}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {group.technologies.map((tech) => (
                    <span key={tech.id} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{group.applicants.length}</p>
                  <p className="text-xs text-gray-400">/ {group.maxApplicants} cupos</p>
                </div>
                <span className="text-gray-400 text-lg">{expanded === group.vacancyId ? '▲' : '▼'}</span>
              </div>
            </button>

            {/* Lista de postulantes — se expande al hacer clic */}
            {expanded === group.vacancyId && (
              <div className="border-t border-gray-100">
                {group.applicants.map((app, index) => (
                  <div
                    key={app.id}
                    className={`flex items-center justify-between px-4 py-3 ${
                      index !== group.applicants.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
                        {app.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{app.user.name}</p>
                        <p className="text-xs text-gray-400">{app.user.email}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(app.appliedAt).toLocaleDateString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))
      )}
    </div>
  )
}

export default ApplicationsPage