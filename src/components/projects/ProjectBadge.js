import { Link } from 'react-router-dom';
import { IconCollection } from '../ui/Icons';
import './ProjectBadge.scss';

const ProjectBadge = ({ project }) => {
    return <Link to={`/projects/${project.id}`} className="project-badge">
        <IconCollection />
        {project.name}
    </Link>
}

export default ProjectBadge;
