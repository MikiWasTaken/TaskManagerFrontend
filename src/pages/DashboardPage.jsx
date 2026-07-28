import {useAuth} from '../context/AuthContext'
import {useEffect} from "react";
import api from '../api/axiosInstance'
import {useState} from 'react'
import ProjectList from "../components/ProjectList.jsx";
import UserList  from "../components/UserList.jsx";


function DashboardPage() {
    const {user, loading} = useAuth()
    const [projects, setProjects] = useState([])
    const [users, setUsers] = useState([])

    const doSomething = async (e) => {
        const response = await api.get('/api/users/me/projects')
        setProjects(response.data)
    }

    useEffect(() => {
        if (user) {
            doSomething()
        }
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <p>You're not logged in.</p>
    }
    // if(user.role === 'ADMIN') {
    //     return <p>You're an admin!</p>
    // }

    const loadUsers = async () => {
        const reponse = await api.get('/api/users')
        setUsers(reponse.data)

    }


    let adminButton = null
    if (user.role === 'ADMIN') {
        adminButton = <button onClick={loadUsers}>Admin Only Action</button>
    }


    return (
        <div>
            <h1>Hi, {user.firstName} {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <p>{user.role}</p>
            <p>{user.active}</p>
            <p>{user.createdAt}</p>
            <button onClick={doSomething}>Load Projects</button>
            {adminButton}

            <UserList users = {users}/>
            <ProjectList projects={projects}/>
        </div>
    )
}

export default DashboardPage