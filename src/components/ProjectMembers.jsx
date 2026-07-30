import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import ErrorBanner from "./ErrorBanner.jsx";
import { getErrorMessage } from "../utils/getErrorMessage.js";

const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function ProjectMembers({ project, onProjectUpdated }) {
    const [members, setMembers] = useState([])
    const [newMemberId, setNewMemberId] = useState('')
    const [transferTo, setTransferTo] = useState('')
    const [error, setError] = useState(null)

    function loadMembers() {
        api.get(`/api/projects/${project.id}/members`)
            .then(res => setMembers(res.data))
            .catch(err => setError(getErrorMessage(err)))
    }

    useEffect(() => {
        loadMembers()
    }, [project.id])

    async function handleAddMember(e) {
        e.preventDefault()
        setError(null)
        try {
            await api.post(`/api/projects/${project.id}/members/${newMemberId}`)
            setNewMemberId('')
            loadMembers()
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleRemoveMember(userId) {
        const confirmed = window.confirm("Remove this member from the project?")
        if (!confirmed) return
        setError(null)
        try {
            await api.delete(`/api/projects/${project.id}/members/${userId}`)
            loadMembers()
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleTransferOwnership(e) {
        e.preventDefault()
        setError(null)
        try {
            const response = await api.patch(`/api/projects/${project.id}`, { owner: transferTo })
            setTransferTo('')
            onProjectUpdated(response.data)
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    return (
        <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Members</h3>

            <ErrorBanner message={error} />

            <ul className="flex flex-col gap-2 mb-4">
                {members.map(member => (
                    <li key={member.id} className="flex items-center justify-between text-sm text-gray-700">
                        <span>
                            {member.firstName} {member.lastName}
                            {member.id === project.ownerId && <span className="text-blue-700 font-medium"> (owner)</span>}
                        </span>
                        <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="px-2 py-1 rounded text-xs text-red-700 hover:bg-red-100"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleAddMember} className="flex gap-2 mb-4">
                <input
                    className={inputClasses + " flex-1"}
                    placeholder="User ID (UUID)"
                    value={newMemberId}
                    onChange={(e) => setNewMemberId(e.target.value)}
                />
                <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                    Add
                </button>
            </form>
            <p className="text-xs text-gray-500 mb-4">
                There's no user lookup yet — ask the person for their user ID, or find it on the admin Users page.
            </p>

            <form onSubmit={handleTransferOwnership} className="flex gap-2">
                <select
                    className={inputClasses + " flex-1"}
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                >
                    <option value="">Transfer ownership to...</option>
                    {members.filter(m => m.id !== project.ownerId).map(member => (
                        <option key={member.id} value={member.id}>
                            {member.firstName} {member.lastName}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={!transferTo} className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 disabled:opacity-50">
                    Transfer
                </button>
            </form>
        </div>
    )
}

export default ProjectMembers
