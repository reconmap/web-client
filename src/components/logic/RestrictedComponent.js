import Auth from "services/auth";

const RestrictedComponent = ({ roles, children, message = '' }) => {
    const user = Auth.getLoggedInUser();

    return (!user || !roles.includes(user.role) ? message : children);
}

export default RestrictedComponent;
