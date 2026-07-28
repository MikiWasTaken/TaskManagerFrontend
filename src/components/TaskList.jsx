function TaskList({ tasks }) {
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}, {task.description}, Assignee {task.assignee}</p>
                </div>
            ))}
        </div>)
}


export default TaskList





