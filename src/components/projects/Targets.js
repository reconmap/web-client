import Loading from "../ui/Loading"
import {IconPlus, IconServer} from '../ui/Icons'
import {useHistory} from 'react-router-dom'
import SecondaryButton from '../ui/buttons/Secondary'
import useFetch from "../../hooks/useFetch";
import React from "react";

const ProjectTargets = ({project}) => {
    const history = useHistory()

    const [targets] = useFetch(`/targets?projectId=${project.id}`)

    const handleAddTarget = () => {
        history.push(`/projects/${project.id}/targets/create`)
    }

    return <section>
        <h4>
            <IconServer/>Targets
            <SecondaryButton onClick={handleAddTarget}><IconPlus/>Add target</SecondaryButton>
        </h4>
        {!targets ? <Loading/> :
            <table>
                <thead>
                <tr>
                    <th>Kind</th>
                    <th>Name</th>
                    <th>Vulnerable?</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {targets.map((target, index) =>
                    <tr key={index}>
                        <td><IconServer/> {target.kind}</td>
                        <td><a
                            onClick={() => history.push(`/projects/${project.id}/targets/${target.id}`)}>{target.name}</a>
                        </td>
                        <td>{target.num_vulnerabilities > 0 ? `Yes (${target.num_vulnerabilities} vulnerabilities found)` : "No"}</td>
                        <td></td>
                    </tr>
                )}
                </tbody>
            </table>
        }
    </section>
}

export default ProjectTargets;
