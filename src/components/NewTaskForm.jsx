import {useEffect, useState} from "react";
import api from "../api/axiosInstance.js";

const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function NewTaskForm({projectId, onTaskCreated}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [assigneeId, setAssigneeId] = useState('')
    const [priority, setPriority] = useState('MEDIUM')
    const [status, setStatus] = useState('TODO')


    const [members, setMembers] = useState([])

    useEffect(() => {
        api.get(`/api/projects/${projectId}/members`).then(res => setMembers(res.data))
    }, [projectId])


    async function handleSubmit(e)
    {
        e.preventDefault();
        const response = await api.post(`/api/projects/${projectId}/tasks`, {title, description, assigneeId: assigneeId || null, priority: priority || "MEDIUM", status})

        onTaskCreated(response.data)
        setTitle('')
        setDescription('')
        setAssigneeId('')
        setPriority('MEDIUM')
        setStatus('TODO')



    }

    return(
        <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    className={inputClasses}
                    placeholder="Task title"
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
                    <option value="">Select assignee</option>
                    {members.map((member) => (
                        <option key={member.id} value={member.id}>
                            {member.lastName} {member.firstName}
                        </option>
                    ))}
                </select>

                <select
                    className={inputClasses}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
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


                <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                    Add Task
                </button>
            </form>
        </div>
    )
}

export default NewTaskForm
