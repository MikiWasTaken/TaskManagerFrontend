import { createContext, useContext, useState, useEffect } from 'react'
import api from '../api/axiosInstance'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const restoreUser = async () => {
            if (!token) {
                setLoading(false)
                return
            }
            try {
                const response = await api.get('/api/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(response.data)
            } catch (err) {
                // token is invalid/expired — clear everything
                setToken(null)
                localStorage.removeItem('token')
            } finally {
                setLoading(false)
            }
        }

        restoreUser()
    }, [])

    const login = (userData, jwtToken) => {
        setUser(userData)
        setToken(jwtToken)
        localStorage.setItem('token', jwtToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}