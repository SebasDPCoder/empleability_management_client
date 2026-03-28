// src/components/VacancyForm.tsx
import { useState } from 'react'
import type { VacancyForm as VacancyFormType, Vacancy } from '../api/vacancies'
import Button from './Button'

type Props = {
  initial?: Vacancy
  onSubmit: (data: VacancyFormType) => Promise<void>
  onCancel: () => void
}

const emptyForm: VacancyFormType = {
  title: '',
  description: '',
  seniority: '',
  softSkills: '',
  location: '',
  modality: 'presencial',
  salaryRange: '',
  company: '',
  maxApplicants: 1,
  technologies: [],
}

function VacancyForm({ initial, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<VacancyFormType>(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          seniority: initial.seniority,
          softSkills: initial.softSkills,
          location: initial.location,
          modality: initial.modality,
          salaryRange: initial.salaryRange,
          company: initial.company,
          maxApplicants: initial.maxApplicants,
          technologies: initial.technologies.map((t) => t.name),
        }
      : emptyForm
  )
  const [techInput, setTechInput] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'maxApplicants' ? Number(value) : value })
  }

  const addTech = () => {
    const trimmed = techInput.trim()
    if (trimmed && !form.technologies.includes(trimmed)) {
      setForm({ ...form, technologies: [...form.technologies, trimmed] })
    }
    setTechInput('')
  }

  const removeTech = (tech: string) => {
    setForm({ ...form, technologies: form.technologies.filter((t) => t !== tech) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }

  const inputClass = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition'
  const labelClass = 'text-sm font-medium text-gray-700 block mb-1'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título</label>
          <input name="title" value={form.title} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Empresa</label>
          <input name="company" value={form.company} onChange={handleChange} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Seniority</label>
          <select name="seniority" value={form.seniority} onChange={handleChange} className={inputClass} required>
            <option value="">Selecciona...</option>
            <option value="Junior">Junior</option>
            <option value="Middle">Middle</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Modalidad</label>
          <select name="modality" value={form.modality} onChange={handleChange} className={inputClass}>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Híbrido</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ubicación</label>
          <input name="location" value={form.location} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Rango salarial</label>
          <input name="salaryRange" value={form.salaryRange} onChange={handleChange} className={inputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Habilidades blandas</label>
          <input name="softSkills" value={form.softSkills} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Máx. postulantes</label>
          <input type="number" name="maxApplicants" value={form.maxApplicants} onChange={handleChange} min={1} className={inputClass} required />
        </div>
      </div>

      {/* Tecnologías */}
      <div>
        <label className={labelClass}>Tecnologías</label>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
            placeholder="ej: React"
            className={inputClass}
          />
          <button type="button" onClick={addTech} className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 transition">
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {form.technologies.map((tech) => (
            <span key={tech} className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
              {tech}
              <button type="button" onClick={() => removeTech(tech)} className="hover:text-blue-900 font-bold">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition">
          Cancelar
        </button>
        <Button label={loading ? 'Guardando...' : 'Guardar'} type="submit" disabled={loading} />
      </div>
    </form>
  )
}

export default VacancyForm