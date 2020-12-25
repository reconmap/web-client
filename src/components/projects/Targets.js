import Loading from "../ui/Loading"
import {IconPlus, IconServer} from '../ui/Icons'
import {useHistory} from 'react-router-dom'
import SecondaryButton from '../ui/buttons/Secondary'
import useFetch from "../../hooks/useFetch";
import NoResults from "../ui/NoResults";
import React from "react";

const ProjectTargets = ({project}) => {
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

    const [targets] = useFetch(`/projects/${project.id}/targets`)

    const handleAddTarget = () => {
        history.push(`/projects/${project.id}/targets/create`)
    }

    return <section>
        <h4>
            <IconServer/>Targets
            <SecondaryButton onClick={handleAddTarget}><IconPlus/>Add target</SecondaryButton>
        </h4>
        {!targets ? <Loading/> :
            <ul style={styles.targets}>
                {targets.length === 0 && <NoResults/>}
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
