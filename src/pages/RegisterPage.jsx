import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../api/axiosInstance.js'

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const response = await api.post("/api/auth/register", {email, password, firstName, lastName})
        } catch (err) {
            setError(err.response?.data?.message || "Generic fail")
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

            <label>
                First name
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>

            <label>
                Last name
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>

            {error && <p>{error}</p>}

            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate('/login')}>
                Already have an account? Log in
            </button>
        </form>
    )
}

export default RegisterPage
