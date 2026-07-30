import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'
import ErrorBanner from '../components/ErrorBanner'
import { getErrorMessage } from '../utils/getErrorMessage'

const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const response = await api.post('/api/auth/login', { email, password })
            const token = response.data.token
            const profileResponse = await api.get('/api/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            login(profileResponse.data, token)
            navigate('/dashboard')
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <form onSubmit={handleSubmit} className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm w-full max-w-sm p-6 flex flex-col gap-3">
                <h1 className="text-2xl font-semibold text-blue-800 mb-2">Task Manager</h1>

                <ErrorBanner message={error} />

                <input
                    className={inputClasses}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className={inputClasses}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200"
                >
                    Don't have an account? Register
                </button>
            </form>
        </div>
    )
}

export default LoginPage
