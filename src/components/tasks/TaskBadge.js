import { Link } from 'react-router-dom';
import { IconClipboardCheck } from '../ui/Icons';
import './TaskBadge.scss';

const TaskBadge = ({ task }) => {
    return (
        <Link className="task-badge" to={"/tasks/" + task.id}>
            <IconClipboardCheck />
            {task.summary}
        </Link>
    )
}

export default TaskBadge;
