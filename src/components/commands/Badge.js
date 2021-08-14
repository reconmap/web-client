import { Link } from 'react-router-dom'
import { IconTerminal } from '../ui/Icons'

const CommandBadge = ({ command }) => {
    const styles = {
        badge: {
            color: `var(--green)`,
            alignItems: 'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            fontWeight: 'var(--fontBold)',
        }
    }

    return (
        <Link to={"/commands/" + command.id} style={styles.badge}>
            <IconTerminal />
            {command.name}
        </Link>
    )
}

export default CommandBadge;
