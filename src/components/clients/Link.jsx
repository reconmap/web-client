import { Link } from "react-router-dom";
import { IconBriefcase } from "../ui/Icons";

const ClientLink = ({ clientId, children }) => {
    if (!clientId) {
        return "(not set)";
    }

    const styles = {
        badge: {
            alignItems: "center",
            display: `inline-flex`,
            borderRadius: "var(--borderRadius)",
            fontSize: "var(--fontSizeSmall)",
            padding: "var(--paddingBadge)",
        },
    };

    return (
        <Link style={styles.badge} to={`/clients/${clientId}`}>
            <IconBriefcase styling={{ color: "var(--text-color)" }} />
            {children}
        </Link>
    );
};

export default ClientLink;
