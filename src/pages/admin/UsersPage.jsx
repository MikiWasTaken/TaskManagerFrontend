import { useEffect, useState } from "react";
import api from "../../api/axiosInstance.js";
import ErrorBanner from "../../components/ErrorBanner.jsx";
import { getErrorMessage } from "../../utils/getErrorMessage.js";

function UsersPage() {
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)

    function loadUsers() {
        api.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(err => setError(getErrorMessage(err)))
    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function handleRoleChange(userId, role) {
        setError(null)
        try {
            const response = await api.patch(`/api/users/${userId}`, { role })
            setUsers(prev => prev.map(u => u.id === userId ? response.data : u))
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleActiveToggle(userId, isActive) {
        setError(null)
        try {
            const response = await api.patch(`/api/users/${userId}`, { isActive })
            setUsers(prev => prev.map(u => u.id === userId ? response.data : u))
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">Users</h1>

            <ErrorBanner message={error} />

            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Active</th>
                            <th className="p-3">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-b border-gray-200">
                                <td className="p-3 text-xs text-gray-500">{u.id}</td>
                                <td className="p-3">{u.firstName} {u.lastName}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3">
                                    <select
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        value={u.role}
                                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                    >
                                        <option value="USER">USER</option>
                                        <option value="ADMIN">ADMIN</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={u.active}
                                        onChange={(e) => handleActiveToggle(u.id, e.target.checked)}
                                    />
                                </td>
                                <td className="p-3 text-gray-600">{u.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersPage
