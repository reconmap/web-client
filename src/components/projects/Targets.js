import Loading from "../ui/Loading"
import { IconPlus, IconServer } from '../ui/Icons'
import { useHistory } from 'react-router-dom'
import SecondaryButton from '../ui/buttons/Secondary'
import useFetch from "../../hooks/useFetch";
import React from "react";
import DeleteButton from "../ui/buttons/Delete";
import secureApiFetch from "../../services/api";
import NoResultsTableRow from "../ui/NoResultsTableRow";

const ProjectTargets = ({ project }) => {
    const history = useHistory()

    const [targets, updateTargets] = useFetch(`/targets?projectId=${project.id}`)

    const handleAddTarget = () => {
        history.push(`/projects/${project.id}/targets/create`)
    }

    const onDeleteButtonClick = (ev, targetId) => {
        ev.preventDefault();

        secureApiFetch(`/targets/${targetId}`, { method: 'DELETE' })
            .then(() => {
                updateTargets();
            })
    }

    return <section>
        <h4>
            <IconServer />Targets
            <SecondaryButton onClick={handleAddTarget}><IconPlus />Add target</SecondaryButton>
        </h4>
        {!targets ? <Loading /> :
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Kind</th>
                        <th>Vulnerable?</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {targets.length === 0 && <NoResultsTableRow numColumns={4} />}
                    {targets.map((target, index) =>
                        <tr key={index}>
                            <td><a
                                href="/"
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    history.push(`/projects/${project.id}/targets/${target.id}`)
                                }}>{target.name}</a>
                            </td>
                            <td><IconServer /> {target.kind}</td>
                            <td>{target.num_vulnerabilities > 0 ? `Yes (${target.num_vulnerabilities} vulnerabilities found)` : "No"}</td>
                            <td>
                                <DeleteButton onClick={ev => onDeleteButtonClick(ev, target.id)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </section>
}

export default ProjectTargets;
