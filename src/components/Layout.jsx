import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const linkClasses = ({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium ${isActive ? 'bg-blue-800 text-white' : 'text-gray-700 hover:bg-gray-200'}`

function Layout() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div>
            <nav className="bg-gray-100 border-b border-gray-300 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
                    <NavLink to="/projects" className={linkClasses}>Projects</NavLink>
                    <NavLink to="/profile" className={linkClasses}>Profile</NavLink>
                    {user?.role === 'ADMIN' && (
                        <>
                            <NavLink to="/admin/users" className={linkClasses}>Users</NavLink>
                            <NavLink to="/admin/audit-logs" className={linkClasses}>Audit Logs</NavLink>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{user?.firstName} {user?.lastName}</span>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 rounded text-sm text-red-700 hover:bg-red-100"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
