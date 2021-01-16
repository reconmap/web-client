import './TaskStatusFormatter.scss';

const TaskStatusFormatter = ({task}) => {
    return <div
        className={"task-status-formatter " + (task.status === 'done' ? "task-status-formatter-done" : "")}>{task.status}</div>
}

export default TaskStatusFormatter;
