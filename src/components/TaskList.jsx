import TaskCard from "./TaskCard.jsx";


function TaskList({ tasks, projectId, onTaskUpdated, onTaskDeleted}) {
    return (
        <div className="flex flex-col gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} projectId={projectId} onTaskUpdated={onTaskUpdated} onTaskDeleted={onTaskDeleted} />
            ))}
        </div>
    )
}


export default TaskList
