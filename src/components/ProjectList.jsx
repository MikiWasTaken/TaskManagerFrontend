import {Link} from "react-router-dom";

function ProjectList({ projects }) {
    return (
        <div>
            {projects.map((project) => (
                <div key={project.id}>
                    <Link to={`/projects/${project.id}`}>
                        <p>{project.name} {project.description}</p>
                    </Link>
                </div>
            ))}
        </div>)}

export default ProjectList


