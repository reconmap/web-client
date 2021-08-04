import { actionCompletedToast } from 'components/ui/toast';
import { ReactComponent as TargetIcon } from 'images/icons/target.svg';
import TargetKinds from 'models/TargetKinds';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';

const MultipleTargetCreationForm = () => {
    const history = useHistory();
    const { projectId } = useParams();

    const [newTargets, setNewTargets] = useState({ projectId: projectId, lines: "" })
    const [loading, setLoading] = useState(false)

    const [project] = useFetch(`/projects/${projectId}`)

    const handleCreate = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        secureApiFetch(`/targets`, {
            method: 'PATCH', headers: {
                'Bulk-Operation': 'CREATE',
            }, body: JSON.stringify(newTargets)
        })
            .then(() => {
                history.push(`/projects/${newTargets.projectId}`);
                actionCompletedToast(`The targets have been added.`);
            })
    }
    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setNewTargets({ ...newTargets, [name]: value });
    };

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
                </Breadcrumb>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Add targets' icon={<TargetIcon />} />
                <label>
                    <div>
                        <p>Command separated names and kinds (one per line)</p>
                        <p>
                            Acceptable target kind values are:
                            <ul>
                                {TargetKinds.map((targetKind, index) => <li>{targetKind.value}</li>)}
                            </ul>
                        </p>
                    </div>
                    <textarea type="text" name="lines" onChange={handleFormChange} required autoFocus />
                </label>

                <PrimaryButton type="submit"
                    disabled={loading}>Add</PrimaryButton>
            </form>
        </div>
    )
}

export default MultipleTargetCreationForm;
