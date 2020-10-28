import {Link} from 'react-router-dom'
import {IconCollection} from '../icons'

export default function ProjectBadge({project}) {
    const styles = {
        badge : {
            color: `var(--primary-color)`,
            backgroundColor: 'var(--black)',
            alignItems:'center',
            display: `inline-flex`,
            margin: 'var(--margin) 0',
            padding: 'var(--paddingBadge)',
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
