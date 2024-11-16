import { Link } from "react-router-dom";

const DocumentBadge = ({ document }) => {
    const styles = {
        badge: {
            alignItems: "center",
            display: `inline-flex`,
            borderRadius: "var(--borderRadius, 3px)",
        },
    };

    return (
        <Link to={"/documents/" + document.id} style={styles.badge}>
            {document.title}
        </Link>
    );
};

export default DocumentBadge;
