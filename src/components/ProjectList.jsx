import ProjectCard from "./ProjectCard.jsx";

function ProjectList({projects})
{
    return (<div className="flex flex-col gap-4">
        {projects.map(project => (
            <ProjectCard key={project.id} project={project}/>
        ))}
    </div>)
}

export default ProjectList