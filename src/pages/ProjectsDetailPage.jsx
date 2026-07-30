import ProjectInfo from '../components/ProjectInfo'
import ErrorBanner from '../components/ErrorBanner'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axiosInstance'
import { getErrorMessage } from '../utils/getErrorMessage'


function ProjectsDetailPage() {
    const {id} = useParams()
    const [project, setProject] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        api.get(`/api/projects/${id}`)
            .then(res => setProject(res.data))
            .catch(err => setError(getErrorMessage(err)))
    }, [id])

    function handleProjectDeleted() {
        navigate('/projects')
    }

    if (error) return <ErrorBanner message={error} />
    if(!project) return <div>Loading...</div>

    return <ProjectInfo project={project} onProjectUpdated={setProject} onProjectDeleted={handleProjectDeleted} />

}

export default ProjectsDetailPage
