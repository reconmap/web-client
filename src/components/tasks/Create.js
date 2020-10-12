import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import BtnLink from '../ui/buttons/BtnLink';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import Title from '../ui/Title';

export default function TaskCreateForm({match, history}) {
    const projectId = match.params.id;
    const [newTask, setNewTask] = useState({name: null, description: null, parser: 'none', project_id: match.params.id})
    const [loading, setLoading] = useState(false)
    const handleCreate = async (event) => {
        event.preventDefault();

        setLoading(true)
        await secureApiFetch(`/projects/${projectId}/tasks`, {method: 'POST', body: JSON.stringify(newTask)})
        history.push(`/projects/${projectId}`)
    }
    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setNewTask({...newTask, [name]: value});
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
                <Title title='Create Task'/>
                <label>Name
                    <input type="text" name="name" onChange={handleFormChange} required autoFocus/></label>
                <label>Description
                    <input type="description" name="description" onChange={handleFormChange} required/></label>
                <label>Parser
                    <select name="parser" onChange={handleFormChange} required>
                        <option value='none'>none</option>
                        <option value='sqlmap'>sqlmap</option>
                        <option value='nmap'>nmap</option>
                    </select>
                </label>
                <BtnPrimary type="submit"
                            disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <BtnLink onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</BtnLink>
            </form>
        </div>
    )
}
