import { useAuth } from '../context/AuthContext'

function DashboardPage() {
    const { user, loading } = useAuth()

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <p>You're not logged in.</p>
    }

    return (
        <div>
            <h1>Hi, {user.firstName} {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <p>{user.role}</p>
            <p>{user.active}</p>
            <p>{user.createdAt}</p>
        </div>
    )
}

export default DashboardPage