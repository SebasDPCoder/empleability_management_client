// src/pages/LoginPage.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import Button from '../components/Button'

type LoginForm = {
  email: string
  password: string
}

type RoleCard = {
  role: string
  label: string
  email: string
  password: string
  color: string
  bg: string
}

const roleCards: RoleCard[] = [
  {
    role: 'admin',
    label: 'Admin',
    email: 'admin@riwi.io',
    password: 'Admin123!',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
  },
  {
    role: 'gestor',
    label: 'Gestor',
    email: 'gestor@riwi.io',
    password: 'Gestor123!',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
  },
  {
    role: 'coder',
    label: 'Coder',
    email: 'coder@riwi.io',
    password: 'Password123!',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-200 hover:bg-green-100',
  },
]

function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [activeRole, setActiveRole] = useState<string>('')
  const navigate = useNavigate()

  const handleCardClick = (card: RoleCard) => {
    setActiveRole(card.role)
    setForm({ email: card.email, password: card.password })
    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveRole('')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await login(form)
      localStorage.setItem('token', response.data.access_token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      const role = response.data.user.role
      if (role === 'coder') {
        navigate('/vacancies')
      } else {
        navigate('/dashboard')
      }
    } catch {
      setError('Credenciales incorrectas. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Empleability</h1>
          <p className="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
        </div>

        {/* Cards de roles */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
          Acceso rápido por rol
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {roleCards.map((card) => (
            <button
              key={card.role}
              type="button"
              onClick={() => handleCardClick(card)}
              className={`border rounded-xl p-3 text-center transition-all cursor-pointer ${card.bg} ${
                activeRole === card.role ? 'ring-2 ring-offset-1 ring-gray-400' : ''
              }`}
            >
              <p className={`text-sm font-semibold ${card.color}`}>{card.label}</p>
              <p className="text-xs text-gray-400 mt-1 truncate">{card.email}</p>
            </button>
          ))}
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Correo</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="correo@riwi.io"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            label={loading ? 'Iniciando sesión...' : 'Ingresar'}
            type="submit"
            disabled={loading}
            variant="primary"
          />
        </form>

      </div>
    </div>
  )
}

export default LoginPage