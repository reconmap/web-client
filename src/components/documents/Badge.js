import { Link } from 'react-router-dom'
import { IconDocument } from '../ui/Icons'

const DocumentBadge = ({ document }) => {
    const styles = {
        badge: {
            color: `var(--text-color)`,
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            fontWeight: 'var(--fontBold)',
        }
    }

    return <Link to={"/documents/" + document.id} style={styles.badge}>
        <IconDocument />
        {document.title}
    </Link>
}

export default DocumentBadge;
