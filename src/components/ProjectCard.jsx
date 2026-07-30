import { Link } from "react-router-dom";

function ProjectCard({ project }) {
    const statusColor = project.status === 'COMPLETE' ? 'text-green-700' : 'text-blue-700'

    return (
        <Link to={`/projects/${project.id}`} className="block">
            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm p-4 hover:bg-gray-200">
                <h3 className="text-lg font-semibold text-blue-800">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <p className={`text-sm font-medium mt-2 ${statusColor}`}>Status: {project.status}</p>
            </div>
        </Link>
    )
}

export default ProjectCard



