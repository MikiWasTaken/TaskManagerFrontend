import { useEffect, useState } from 'react'
import api from "../api/axiosInstance.js";

function ProjectCard({project})
{
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(project.title)
    const [description, setDescription] = useState(project.description)


    useEffect(()=>{
        api.get(`/projects/${project.id}`).then(res=>{setTitle(res.data.title)})
    })
}


return (
    <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4">
        <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-sm text-gray-600">
            Assignee: {task.assigneeFirstName ? `${task.assigneeFirstName} ${task.assigneeLastName}` : "No assignee yet"}</p>
        <p className={`text-sm font-medium ${priorityColor}`}>Priority: {task.priority}</p>
        <p className="text-sm text-gray-600">Status: {task.status}</p>



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