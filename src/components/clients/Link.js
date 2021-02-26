import { Link } from "react-router-dom";
import { IconBriefcase } from "../ui/Icons";

const ClientLink = ({ clientId, children }) => {
    const styles = {
        badge: {
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius)',
            fontWeight: 'var(--fontBold)',
            fontSize: 'var(--fontSizeSmall)',
            backgroundColor: 'var(--black)',
            padding: 'var(--paddingBadge)',
        }
    }

    return <Link
        style={styles.badge}
        to={`/clients/${clientId}`}>
        <IconBriefcase styling={{ color: 'var(--text-color)' }} />
        {children}
    </Link>
}

export default ClientLink;
