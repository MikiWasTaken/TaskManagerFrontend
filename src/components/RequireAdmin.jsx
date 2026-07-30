import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RequireAdmin() {
    const { user } = useAuth()

    if (user.role !== 'ADMIN') return <Navigate to="/dashboard" replace />

    return <Outlet />
}

export default RequireAdmin
