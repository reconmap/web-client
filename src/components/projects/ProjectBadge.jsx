import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { IconCollection } from "../ui/Icons";
import "./ProjectBadge.css";

const ProjectBadge = ({ project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="project-badge">
            <IconCollection />
            {project.name}
        </Link>
    );
};

ProjectBadge.propTypes = {
    project: PropTypes.object.isRequired,
};

export default ProjectBadge;
