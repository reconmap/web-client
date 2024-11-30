import { Link } from "react-router-dom";

const styles = {
    badge: {
        alignItems: "center",
        display: `inline-flex`,
        fontSize: "var(--fontSizeSmall)",
    },
};

const ClientLink = ({ clientId, children }) => {
    if (!clientId) {
        return "(not set)";
    }

    return (
        <Link style={styles.badge} to={`/clients/${clientId}`}>
            {children}
        </Link>
    );
};

export default ClientLink;
