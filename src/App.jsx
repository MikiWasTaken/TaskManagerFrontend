import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectsDetailPage from './pages/ProjectsDetailPage'
import ProfilePage from './pages/ProfilePage'
import UsersPage from './pages/admin/UsersPage'
import AuditLogsPage from './pages/admin/AuditLogsPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import RequireAdmin from './components/RequireAdmin'
import Layout from './components/Layout'

function IndexRedirect() {
    const { user, loading } = useAuth()
    if (loading) return null
    return <Navigate to={user ? '/dashboard' : '/login'} replace />
}

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectsDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              <Route element={<RequireAdmin />}>
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<div className="p-6">Page not found.</div>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App
