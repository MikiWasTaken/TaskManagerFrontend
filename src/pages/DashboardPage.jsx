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
            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6">
                <h1 className="text-2xl font-semibold text-blue-800">Hi, {user.firstName} {user.lastName}</h1>
                <p className="text-sm text-gray-600 mt-1">Email: {user.email}</p>
                <p className="text-sm text-gray-600">Role: {user.role}</p>
                <p className="text-sm text-gray-600">Active: {user.active ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-600">Joined: {user.createdAt}</p>
            </div>
            {/*<button onClick={doSomething} className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 mb-4">Load Projects</button>*/}
            {adminButton}

            <UserList users = {users}/>
            <ProjectList projects={projects}/>
        </div>
    )
}

export default DashboardPage