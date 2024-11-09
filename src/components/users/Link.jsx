import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Link.css";

const UserLink = ({ userId, children }) => {
    return (
        <Link className="user-link" to={`/users/${userId}`}>
            {children}
        </Link>
    );
};

UserLink.propTypes = {
    userId: PropTypes.any.isRequired,
};

export default UserLink;
