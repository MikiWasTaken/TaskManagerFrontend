import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectsDetailPage from './pages/ProjectsDetailPage'
import ProfilePage from './pages/ProfilePage'
import UsersPage from './pages/admin/UsersPage'
import AuditLogsPage from './pages/admin/AuditLogsPage'
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectsDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App