import type { Vacancy } from '../api/vacancies'

type Props = {
  vacancy: Vacancy
  onEdit: () => void
  onDelete: () => void
  onToggleActive: () => void
  isAdmin: boolean
}

function VacancyCard({ vacancy, onEdit, onDelete, onToggleActive, isAdmin }: Props) {
  return (
    <div className="border border-gray-200 rounded-xl p-4 mb-3 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-base font-semibold text-gray-800">{vacancy.title}</h3>
            <span className={`text-xs px-3 py-0.5 rounded-full font-medium ${
              vacancy.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>
              {vacancy.isActive ? 'Activa' : 'Inactiva'}
            </span>
          </div>
          <p className="text-sm text-gray-500">{vacancy.company} · {vacancy.location} · {vacancy.modality}</p>
          <p className="text-sm text-gray-600 mt-2">{vacancy.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {vacancy.technologies.map((tech) => (
              <span key={tech.id} className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={onEdit}
            className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Editar
          </button>
          <button
            onClick={onToggleActive}
            className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            {vacancy.isActive ? 'Inactivar' : 'Activar'}
          </button>
          {isAdmin && (
            <button
              onClick={onDelete}
              className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition"
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VacancyCard