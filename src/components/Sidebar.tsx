import { NavLink, useNavigate } from 'react-router-dom'

type NavItem = {
  label: string
  path: string
  icon: string
}

const itemsByRole: Record<string, NavItem[]> = {
  admin: [
    { label: 'Vacantes', path: '/dashboard', icon: '💼' },
    { label: 'Postulaciones', path: '/applications', icon: '📋' },
    { label: 'Usuarios', path: '/users', icon: '👥' },
  ],
  gestor: [
    { label: 'Vacantes', path: '/dashboard', icon: '💼' },
    { label: 'Postulaciones', path: '/applications', icon: '📋' },
  ],
  coder: [
    { label: 'Vacantes', path: '/vacancies', icon: '💼' },
  ],
}

function Sidebar() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const items = itemsByRole[user.role] ?? []

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-200 flex flex-col">

      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-100">
        <h1 className="text-lg font-bold text-gray-900">Empleability</h1>
        <p className="text-xs text-gray-400 mt-0.5">Riwi Program</p>
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Usuario y logout */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-gray-800 truncate">{user.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left text-xs text-red-500 hover:text-red-700 transition px-1 py-1"
        >
          Cerrar sesión →
        </button>
      </div>

    </aside>
  )
}

export default Sidebar