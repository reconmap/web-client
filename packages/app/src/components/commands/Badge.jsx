import { Link } from "react-router-dom";

const CommandBadge = ({ command }) => {
    const styles = {
        badge: {
            alignItems: "center",
            display: `inline-flex`,
            borderRadius: "var(--borderRadius, 3px)",
        },
    };

    return (
        <Link to={"/commands/" + command.id} style={styles.badge}>
            {command.name}
        </Link>
    );
};

export default CommandBadge;
