import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import TargetKinds from '../../models/TargetKinds'
import BtnPrimary from '../ui/buttons/BtnPrimary';
import BtnLink from '../ui/buttons/BtnLink';
import Title from '../ui/Title';

export default function TargetCreateForm({match, history}) {
    const projectId = match.params.id;
    const [newTarget, setNewTarget] = useState({projectId: projectId, name: null, kind: TargetKinds[0].value})
    const [loading, setLoading] = useState(false)
    const handleCreate = async (event) => {
        event.preventDefault();

        setLoading(true)
        await secureApiFetch(`/targets`, {method: 'POST', body: JSON.stringify(newTarget)})
        history.push(`/projects/${projectId}`)
    }
    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setNewTarget({...newTarget, [name]: value});
    };
    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <form onSubmit={handleCreate}>
                <Title title='Create Target'/>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus/></label>
                <label>Kind
                    <select name="kind" onChange={handleFormChange}>
                        {TargetKinds.map((targetKind, index) =>
                            <option value={targetKind.value}>{targetKind.description}</option>
                        )}
                    </select>
                </label>
                <BtnPrimary type="submit"
                            disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <BtnLink onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</BtnLink>
            </form>
        </div>
    )
}
