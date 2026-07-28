import {useEffect, useState} from "react";

import api from "../api/axiosInstance.js";
import TaskList from '../components/TaskList'

function ProjectInfo({ project }) {

        const [todoCount, setTodoCount] = useState(null)
        const [tasks, setTasks] = useState([])

        useEffect(() =>
            {
                api.get(`/api/projects/${project.id}/tasks`).then(response => setTasks(response.data))
            },
        [project.id])

        useEffect(() =>

         {api.get(`/api/projects/${project.id}/tasks?taskStatus=TODO`).then(res => setTodoCount(res.data.length))},[project.id])

    return (<div><h1>{project.name} - {project.description}, Status: {project.status}, Active tasks: {todoCount}</h1>
        <TaskList tasks={tasks}/></div>)
}

export default ProjectInfo;