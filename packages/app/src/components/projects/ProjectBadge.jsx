import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProjectBadge.css";

const ProjectBadge = ({ project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="project-badge">
            {project.name}
        </Link>
    );
};

ProjectBadge.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectBadge;
