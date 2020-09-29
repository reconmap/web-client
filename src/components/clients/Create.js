import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import BtnLink from '../ui/buttons/BtnLink';
import Title from '../ui/Title';

export default function ClientCreate({history}) {
    const [newClient, setNewClient] = useState({
        name: null,
        url: null,
        contactName: null,
        contactEmail: null,
        contactPhone: null
    })
    const [loading, setLoading] = useState(false)
    const handleCreate = async () => {
        setLoading(true)
        await secureApiFetch(`/clients`, {method: 'POST', body: JSON.stringify(newClient)})
        history.push(`/clients`)
    }
    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setNewClient({...newClient, [name]: value});
    };
    const handleGoBack = () => {
        history.goBack()
    }
    const allFieldsFilled = newClient.name

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <Title title='Create Client'/>
                <label>Name
                    <input autoFocus type="text" name="name" onChange={handleFormChange}/></label>
                <label>URL
                    <input type="text" name="url" onChange={handleFormChange}/></label>
                <label>Contact name
                    <input type="text" name="contactName" onChange={handleFormChange}/></label>
                <label>Contact email
                    <input type="text" name="contactEmail" onChange={handleFormChange}/></label>
                <label>Contact phone
                    <input type="text" name="contactPhone" onChange={handleFormChange}/></label>
                <BtnPrimary onClick={handleCreate}
                            disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <BtnLink onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</BtnLink>
            </form>
        </div>
    )
}
