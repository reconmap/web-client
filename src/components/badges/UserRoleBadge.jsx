const roles = {
    administrator: "red",
    superuser: "blue",
    user: "green",
    client: "yellow",
};

const UserRoleBadge = ({ role }) => {
    const color = roles.hasOwnProperty(role) ? roles[role] : "yellow";

    const styles = {
        borderRadius: "var(--borderRadius, 3px)",
    };

    return <span style={styles}>{role}</span>;
};

export default UserRoleBadge;
