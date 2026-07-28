import ProjectInfo from '../components/ProjectInfo'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axiosInstance'


function ProjectsDetailPage() {
    const {id} = useParams()
    const [project, setProject] = useState(null)

    useEffect(() => {
        api.get(`/api/projects/${id}`).then(res => setProject(res.data))
    }, [id])

    if(!project) return <div>Idk man there's no project</div>

    return <ProjectInfo project={project} />

}

export default ProjectsDetailPage


