import TaskCard from "./TaskCard.jsx";

// Task list is a component.
// A component is a JavaScript function that returns jsx.
// JSX is HTML-like code directly written within javascript files.

//the TaskList parameters are called props. Parameters passed in from the parent.
//Props are how parent components talk to children


//When TaskList renders a TaskCard, it passes the props like attributes.
// Props only flow downward, so the child can't change the parent's data DIRECTLY.
// For that, you use callback functions like onTaskUpdated and onTaskDeleted that tell the parent something happened.
// Parent defines a function, sends it as a prop to the child, child calls it when needed

// the TaskCard needs a key because you need a way to tell the items apart. without keys React wouldn't know WHICH item changed

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
