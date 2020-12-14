import Loading from "../ui/Loading"
import {IconPlus, IconServer} from '../ui/Icons'
import {useHistory} from 'react-router-dom'
import SecondaryButton from '../ui/buttons/Secondary'

const ProjectTargets = ({project, targets, handleAddTarget}) => {
    const history = useHistory()
    const styles = {
        targets: {
            display: 'flex',
            gap: 'var(--padding)'
        },
        bullet: {
            display: 'flex',
            gap: 'var(--margin)'
        }
    }
    return <section>
        <h4>
            <IconServer/> Target(s)
            <SecondaryButton onClick={handleAddTarget}><IconPlus/>Add target</SecondaryButton>
        </h4>
        {!targets ? <Loading/> :
            <ul style={styles.targets}>
                {targets.map((target, index) =>
                    <li key={index} onClick={() => history.push(`/projects/${project.id}/targets/${target.id}`)}>
                        <button style={styles.bullet}>
                            <IconServer/>
                            {target.name}
                            <small>{target.kind}</small>
                        </button>
                    </li>)}
            </ul>}

    </section>
}

export default ProjectTargets
