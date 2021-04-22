
const RestrictedComponent = ({ roles, children, message = '' }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (!user || !roles.includes(user.role) ? message : children);
}

export default RestrictedComponent;
