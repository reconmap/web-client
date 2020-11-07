import {IconCheck, IconX} from "../ui/Icons"
import './TaskStatusBadge.css';

const TaskStatusBadge = ({completed}) => {
    const classNames = parseInt(completed) === 1 ? "TaskStatusBadge TaskStatusBadgeCompleted" : "TaskStatusBadge";
    return (
        <div className={classNames}>
            {completed === '1' ? <IconCheck/> : <IconX/>}
        </div>
    )
}

export default TaskStatusBadge
