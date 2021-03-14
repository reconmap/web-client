
const RestrictedComponent = ({ roles, children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (!user || !roles.includes(user.role) ? <></> : children);
}

export default RestrictedComponent;
