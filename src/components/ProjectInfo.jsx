import {useEffect, useState} from "react";

import api from "../api/axiosInstance.js";
import TaskList from '../components/TaskList'
import NewTaskForm from "./NewTaskForm.jsx";
import ProjectMembers from "./ProjectMembers.jsx";
import DocumentsPanel from "./DocumentsPanel.jsx";
import ErrorBanner from "./ErrorBanner.jsx";
import { getErrorMessage } from "../utils/getErrorMessage.js";


// ... is the spread operator.
// if prevTasks had 3 items, this would be conceptually the same:
// [...prevTasks, newTask] = [task1, task2, task3, newTask]
// you MUST ALWAYS remake an array when something happens in it.
// if you only mutate the array, its ID stays the same. To re-render you must create a new ID => a completely new array



function ProjectInfo({ project, onProjectUpdated, onProjectDeleted }) {

    const [todoCount, setTodoCount] = useState(null)
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')
    const [filterPriority, setFilterPriority] = useState('')
    const [deadlineAfter, setDeadlineAfter] = useState('')
    const [deadlineBefore, setDeadlineBefore] = useState('')

    const [isEditingProject, setIsEditingProject] = useState(false)
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setProjectStatus] = useState(project.status)
    const [error, setError] = useState(null)

    async function handleProjectSave(e) {
        e.preventDefault()
        setError(null)
        try {
            const response = await api.patch(`/api/projects/${project.id}`, { name, description, projectStatus: status })
            onProjectUpdated(response.data)
            setIsEditingProject(false)
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleProjectDelete() {
        const confirmed = window.confirm("Delete this project? This cannot be undone.")
        if (!confirmed) return
        setError(null)
        try {
            await api.delete(`/api/projects/${project.id}`)
            onProjectDeleted()
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    function handleTaskCreated(newTask) {
        setTasks(prevTasks => [...prevTasks, newTask])
        setShowForm(false)
    }

    function handleTaskUpdated(updatedTask) {
        setTasks(prevTasks =>
            prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
        )
    }

    function handleTaskDeleted(taskId)
    {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
    }



    useEffect(() => {
        api.get(`/api/projects/${project.id}/tasks`, {
            params: {
                taskStatus: filterStatus || undefined,
                taskPriority: filterPriority || undefined,
                deadlineAfter: deadlineAfter || undefined,
                deadlineBefore: deadlineBefore || undefined
            }
        }).then(response => setTasks(response.data))
    }, [project.id, filterStatus, filterPriority, deadlineAfter, deadlineBefore])


    useEffect(() => {
        api.get(`/api/projects/${project.id}/tasks?taskStatus=TODO`).then(res => setTodoCount(res.data.length))
    }, [project.id])

    return (<div>
        <ErrorBanner message={error} />

        {isEditingProject ? (
            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6">
                <form onSubmit={handleProjectSave} className="flex flex-col gap-3">
                    <input
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <select
                        className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                        value={status}
                        onChange={(e) => setProjectStatus(e.target.value)}
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="COMPLETE">Complete</option>
                    </select>
                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900">
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditingProject(false)}
                            className="px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        ) : (
            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm p-4 mb-6">
                <h1 className="text-2xl font-semibold text-blue-800">{project.name}</h1>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                    <span>Status: <span className="font-medium text-gray-700">{project.status}</span></span>
                    <span>Active tasks: <span className="font-medium text-gray-700">{todoCount}</span></span>
                </div>
                <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => setIsEditingProject(true)}
                        className="px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200"
                    >
                        Edit Project
                    </button>
                    <button
                        onClick={handleProjectDelete}
                        className="px-4 py-2 rounded text-sm text-red-700 hover:bg-red-100"
                    >
                        Delete Project
                    </button>
                </div>
            </div>
        )}

        <ProjectMembers project={project} onProjectUpdated={onProjectUpdated} />
        <DocumentsPanel projectId={project.id} />

        <button
            onClick={() => setShowForm(prev => !prev)}
            className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 mb-4"
        >
            {showForm ? 'Cancel' : 'Add New Task'}
        </button>

        <div className="flex gap-3 mb-4">
            <select
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="">All statuses</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>

            <select
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
            >
                <option value="">All priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
            </select>

            <input
                type="datetime-local"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                value={deadlineAfter}
                onChange={(e) => setDeadlineAfter(e.target.value)}
            />
            <input
                type="datetime-local"
                className="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
                value={deadlineBefore}
                onChange={(e) => setDeadlineBefore(e.target.value)}
            />
        </div>

        {showForm && <NewTaskForm projectId={project.id} onTaskCreated={handleTaskCreated}/>}
        <TaskList tasks={tasks} projectId={project.id} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted}/>

    </div>)
}

export default ProjectInfo