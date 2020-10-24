import { Link } from 'react-router-dom'
import { IconTerminal } from '../icons'

export default function TaskBadge({task}) {
    const styles = {
        badge : {
            color: `var(--green)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            fontWeight : 'var(--fontBold)',
        }
    }

    return (
        <Link to={"/tasks/" + task.id} style={ styles.badge } >
            <IconTerminal  />
            {task.name}
        </Link>
    )
}
