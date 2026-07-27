// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { Box, Button, TextField, Typography, Alert } from '@mui/material'
// import { useAuth } from '../context/AuthContext'
// import api from '../api/axiosInstance'
//
// function LoginPage() {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState("")
//
//     const { login } = useAuth()
//     const navigate = useNavigate()
//
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setError(null)
//         try {
//             const response = await api.post('/api/auth/login', { email, password })
//             const token = response.data.token
//             const profileResponse = await api.get('/api/users/me', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             login(profileResponse.data, token)
//             navigate('/dashboard')
//         } catch (err) {
//             setError(err.response?.data?.message || 'Invalid email or password')
//         }
//     }
//
//     return (
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//             <Box component="form" onSubmit={handleSubmit} sx={{ width: 360 }}>
//                 <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>Task Manager</Typography>
//                 <TextField label="Email" type="email" fullWidth margin="normal"
//                            value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <TextField label="Password" type="password" fullWidth margin="normal"
//                            value={password} onChange={(e) => setPassword(e.target.value)} />
//                 {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//                 <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
//                     Login
//                 </Button>
//                 <Button fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
//                     Don't have an account? Register
//                 </Button>
//             </Box>
//         </Box>
//     )
// }
//
// export default LoginPage



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState("")
    const [failedAttempts, setFailedAttempts] = useState(0);

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
            setFailedAttempts(failedAttempts + 1)
            setError(err.response?.data?.message || 'Invalid email or password')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Task Manager</h1>

            <label>
                Email
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            {error && <p>{error}</p>}

            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate('/register')}>
                Don't have an account? Register
            </button>
            <h1>you messed up {failedAttempts} times</h1>
        </form>
    )
}

export default LoginPage