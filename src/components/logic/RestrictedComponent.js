
const RestrictedComponent = ({ roles, children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    return (!user || roles.indexOf(user.role) === -1 ? <></> : children);
}

export default RestrictedComponent;
