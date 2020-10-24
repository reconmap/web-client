import {Link} from 'react-router-dom'
import {IconCollection} from '../icons'

export default function ProjectBadge({project}) {
    const styles = {
        badge : {
            color: `var(--blue)`,
            alignItems:'center',
            display: `inline-flex`,
            borderRadius: 'var(--borderRadius, 3px)',
            fontWeight : 'var(--fontBold)',
        }
    }

    return (<Link to={`/projects/${project.id}`} style={ styles.badge }>
                <IconCollection />
                {project.name}
            </Link>
    )
}
