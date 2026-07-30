import { useState, useEffect } from "react";
import api from "../api/axiosInstance.js";
import ProjectList from "../components/ProjectList.jsx";
import ErrorBanner from "../components/ErrorBanner.jsx";
import { getErrorMessage } from "../utils/getErrorMessage.js";
import { useAuth } from "../context/AuthContext.jsx";

const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function ProjectsPage() {
    const { user } = useAuth()
    const [projects, setProjects] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    async function loadProjects() {
        try {
            const response = await api.get(showAll ? "/api/projects" : "/api/users/me/projects");
            setProjects(response.data);
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    useEffect(() => {
        loadProjects();
    }, [showAll])

    async function handleCreate(e) {
        e.preventDefault()
        setError(null)
        try {
            const response = await api.post("/api/projects", { name, description });
            setProjects(prev => [response.data, ...prev])
            setName('')
            setDescription('')
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">Projects</h1>

            <ErrorBanner message={error} />

            <form onSubmit={handleCreate} className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6 flex flex-col gap-3">
                <input
                    className={inputClasses}
                    placeholder="Project name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className={inputClasses}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 self-start">
                    Create Project
                </button>
            </form>

            {user.role === 'ADMIN' && (
                <button
                    onClick={() => setShowAll(prev => !prev)}
                    className="mb-4 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-200 border border-gray-300"
                >
                    {showAll ? 'Show my projects' : 'Show all projects (admin)'}
                </button>
            )}

            <ProjectList projects={projects}/>
        </div>
    )
}

export default ProjectsPage
