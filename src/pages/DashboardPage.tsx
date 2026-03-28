import { useState, useEffect } from 'react'
import type { VacancyForm, Vacancy } from '../api/vacancies'
import {
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} from '../api/vacancies'
import VacancyCard from '../components/VacancyCard'
import VacancyFormComponent from '../components/VacancyForm'
import Button from '../components/Button'
import LoadingSpinner from '../components/LoadingSpinner'

type Modal = 'create' | 'edit' | null

function DashboardPage() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [modal, setModal] = useState<Modal>(null)
  const [selected, setSelected] = useState<Vacancy | null>(null)

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const fetchVacancies = () => {
    setLoading(true)
    getAllVacancies()
      .then((res) => setVacancies(res.data))
      .catch(() => setError('Error al cargar las vacantes'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchVacancies()
  }, [])

  const handleCreate = async (data: VacancyForm) => {
    await createVacancy(data)
    setModal(null)
    fetchVacancies()
  }

  const handleEdit = async (data: VacancyForm) => {
    if (!selected) return
    await updateVacancy(selected.id, data)
    setModal(null)
    setSelected(null)
    fetchVacancies()
  }

  const handleToggleActive = async (vacancy: Vacancy) => {
    await updateVacancy(vacancy.id, { isActive: !vacancy.isActive })
    fetchVacancies()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta vacante?')) return
    await deleteVacancy(id)
    fetchVacancies()
  }

  const openEdit = (vacancy: Vacancy) => {
    setSelected(vacancy)
    setModal('edit')
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex gap-3">
          <Button label="+ Nueva vacante" onClick={() => setModal('create')} />

        </div>
      </div>

      {/* Lista */}
      {vacancies.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">No hay vacantes aún.</p>
      ) : (
        vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            vacancy={vacancy}
            onEdit={() => openEdit(vacancy)}
            onDelete={() => handleDelete(vacancy.id)}
            onToggleActive={() => handleToggleActive(vacancy)}
            isAdmin={user.role === 'admin'}
          />
        ))
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {modal === 'create' ? 'Nueva vacante' : 'Editar vacante'}
            </h2>
            <VacancyFormComponent
              initial={modal === 'edit' && selected ? selected : undefined}
              onSubmit={modal === 'create' ? handleCreate : handleEdit}
              onCancel={() => { setModal(null); setSelected(null) }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default DashboardPage