import { Navigate } from 'react-router-dom'

type Props = {
  children: React.ReactNode
  allowedRoles?: string[]   // ej: ['admin', 'gestor']
}

function ProtectedRoute({ children, allowedRoles }: Props) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')


  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute