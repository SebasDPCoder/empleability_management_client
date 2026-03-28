// src/pages/UsersPage.tsx
import { useState, useEffect } from 'react'
import { getAllUsers } from '../api/users'
import type { User } from '../api/users'
import LoadingSpinner from '../components/LoadingSpinner'

const roleBadge: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  gestor: 'bg-blue-100 text-blue-700',
  coder: 'bg-green-100 text-green-700',
}

function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [filter, setFilter] = useState<string>('todos')

  useEffect(() => {
    getAllUsers()
      .then((res) => setUsers(res.data))
      .catch(() => setError('Error al cargar los usuarios'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'todos'
    ? users
    : users.filter((u) => u.role === filter)

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usuarios</h1>
          <p className="text-sm text-gray-500 mt-1">{users.length} usuarios registrados</p>
        </div>

        {/* Filtro por rol */}
        <div className="flex gap-2">
          {['todos', 'admin', 'gestor', 'coder'].map((rol) => (
            <button
              key={rol}
              onClick={() => setFilter(rol)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition capitalize ${
                filter === rol
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {rol}
            </button>
          ))}
        </div>
      </div>

      {/* Resumen por rol */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {['admin', 'gestor', 'coder'].map((rol) => {
          const count = users.filter((u) => u.role === rol).length
          return (
            <div key={rol} className={`rounded-xl p-4 text-center border ${
              rol === 'admin' ? 'bg-purple-50 border-purple-100' :
              rol === 'gestor' ? 'bg-blue-50 border-blue-100' :
              'bg-green-50 border-green-100'
            }`}>
              <p className={`text-2xl font-bold ${
                rol === 'admin' ? 'text-purple-700' :
                rol === 'gestor' ? 'text-blue-700' :
                'text-green-700'
              }`}>{count}</p>
              <p className={`text-xs mt-1 capitalize ${
                rol === 'admin' ? 'text-purple-500' :
                rol === 'gestor' ? 'text-blue-500' :
                'text-green-500'
              }`}>{rol}s</p>
            </div>
          )
        })}
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Usuario</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Email</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Rol</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, index) => (
              <tr
                key={user.id}
                className={`${index !== filtered.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition`}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'gestor' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-800">{user.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500">{user.email}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${roleBadge[user.role]}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-10">No hay usuarios con este rol.</p>
        )}
      </div>
    </div>
  )
}

export default UsersPage