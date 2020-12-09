import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import TargetKinds from '../../models/TargetKinds'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';

export default function TargetCreateForm({match, history}) {
    const projectId = match.params.id;
    const [newTarget, setNewTarget] = useState({projectId: projectId, name: null, kind: TargetKinds[0].value})
    const [loading, setLoading] = useState(false)
    const handleCreate = async (ev) => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/targets`, {method: 'POST', body: JSON.stringify(newTarget)})
        history.push(`/projects/${projectId}`)
    }
    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setNewTarget({...newTarget, [name]: value});
    };

    return (
        <div>
            <div className='heading'>
                <Breadcrumb/>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Create Target'/>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus/></label>
                <label>Kind
                    <select name="kind" onChange={handleFormChange}>
                        {TargetKinds.map((targetKind, index) =>
                            <option key={index} value={targetKind.value}>{targetKind.description}</option>
                        )}
                    </select>
                </label>
                <BtnPrimary type="submit"
                            disabled={loading}>Create</BtnPrimary>
            </form>
        </div>
    )
}
