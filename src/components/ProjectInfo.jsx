import {useEffect, useState} from "react";

import api from "../api/axiosInstance.js";
import TaskList from '../components/TaskList'
import NewTaskForm from "./NewTaskForm.jsx";


// ... is the spread operator.
// if prevTasks had 3 items, this would be conceptually the same:
// [...prevTasks, newTask] = [task1, task2, task3, newTask]
// you MUST ALWAYS remake an array when something happens in it.
// if you only mutate the array, its ID stays the same. To re-render you must create a new ID => a completely new array



function ProjectInfo({ project }) {

    const [todoCount, setTodoCount] = useState(null)
    const [tasks, setTasks] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')
    const [filterPriority, setFilterPriority] = useState('')
    const [deadlineAfter, setDeadlineAfter] = useState('')
    const [deadlineBefore, setDeadlineBefore] = useState('')



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
        <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm p-4 mb-6">
            <h1 className="text-2xl font-semibold text-blue-800">{project.name}</h1>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>Status: <span className="font-medium text-gray-700">{project.status}</span></span>
                <span>Active tasks: <span className="font-medium text-gray-700">{todoCount}</span></span>
            </div>
        </div>
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