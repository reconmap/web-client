import RestrictedComponent from "components/logic/RestrictedComponent";
import TargetBadge from "components/target/TargetBadge";
import React from "react";
import { Link, useHistory } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import secureApiFetch from "../../services/api";
import DeleteButton from "../ui/buttons/Delete";
import SecondaryButton from '../ui/buttons/Secondary';
import { IconPlus, IconServer } from '../ui/Icons';
import Loading from "../ui/Loading";
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
            <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                <SecondaryButton onClick={handleAddTarget}><IconPlus />Add target</SecondaryButton>
            </RestrictedComponent>
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
                            <td><Link to={`/projects/${project.id}/targets/${target.id}`}><TargetBadge name={target.name} /></Link>
                            </td>
                            <td>{target.kind}</td>
                            <td>{target.num_vulnerabilities > 0 ? `Yes (${target.num_vulnerabilities} vulnerabilities found)` : "No"}</td>
                            <td>
                                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                    <DeleteButton onClick={ev => onDeleteButtonClick(ev, target.id)} />
                                </RestrictedComponent>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        }
    </section>
}

export default ProjectTargets;
