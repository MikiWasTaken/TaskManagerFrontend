import { useEffect, useState } from 'react'
import api from "../api/axiosInstance.js";
import ErrorBanner from "./ErrorBanner.jsx";
import { getErrorMessage } from "../utils/getErrorMessage.js";
import { toApiDateTime, toDatetimeLocalValue, formatDeadline } from "../utils/dateFormat.js";


//State - data that belongs to a component and can change over time
//When state changes, the component re-renders with the new value



const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function TaskCard({ task, projectId, onTaskUpdated, onTaskDeleted}) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [priority, setPriority] = useState(task.priority)
    const [assigneeId, setAssigneeId] = useState(task.assigneeId || '')
    const [members, setMembers] = useState([])
    const [status, setStatus] = useState(task.status)
    const [deadline, setDeadline] = useState(toDatetimeLocalValue(task.deadline))
    const [error, setError] = useState(null)


    useEffect(() => {
        api.get(`/api/projects/${projectId}/members`).then(res => setMembers(res.data))
    }, [projectId])

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)

        const assigneeChanged = assigneeId !== (task.assigneeId || '')

        try {
            const response = await api.patch(`/api/projects/${projectId}/tasks/${task.id}`, {
                title,
                description,
                priority,
                status,
                deadline: toApiDateTime(deadline),
                assigneeId: assigneeChanged ? (assigneeId || null) : undefined
            })

            onTaskUpdated(response.data)
            setIsEditing(false)
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }



    async function handleDelete() {
        const confirmed = window.confirm("Delete this task?")
        if (!confirmed) return

        setError(null)
        try {
            await api.delete(`/api/projects/${projectId}/tasks/${task.id}`)
            onTaskDeleted(task.id)
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }




    if (isEditing) {
        return (
            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4">
                <ErrorBanner message={error} />
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        className={inputClasses}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className={inputClasses}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        className={inputClasses}
                        value={assigneeId}
                        onChange={(e) => setAssigneeId(e.target.value)}
                    >
                        <option value="">No assignee</option>
                        {members.map((member) => (
                            <option key={member.id} value={member.id}>
                                {member.firstName} {member.lastName}
                            </option>
                        ))}
                    </select>

                    <select
                        className={inputClasses}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>
                    <select
                        className={inputClasses}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                    </select>

                    <input
                        type="datetime-local"
                        className={inputClasses}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    const priorityColor = task.priority === 'HIGH' ? 'text-red-600'
        : task.priority === 'MEDIUM' ? 'text-yellow-600'
            : 'text-green-600'




    return (
        <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4">
            <ErrorBanner message={error} />
            <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <p className="text-sm text-gray-600">
                Assignee: {task.assigneeFirstName ? `${task.assigneeFirstName} ${task.assigneeLastName}` : "No assignee yet"}</p>
            <p className={`text-sm font-medium ${priorityColor}`}>Priority: {task.priority}</p>
            <p className="text-sm text-gray-600">Status: {task.status}</p>
            <p className="text-sm text-gray-600">Deadline: {formatDeadline(task.deadline)}</p>



            <button
                onClick={() => setIsEditing(true)}
                className="mt-2 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200"
            >
                Edit
            </button>

            <button onClick={handleDelete} className="px-4 py-2 rounded text-sm text-red-700 hover:bg-red-100">
                Delete
            </button>
        </div>
    )
}

export default TaskCard
