import React, { useState } from 'react'
import Breadcrumb from '../ui/Breadcrumb'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import BtnLink from '../ui/buttons/BtnLink'
import Title from '../ui/Title'

const ProjectCreate = ({ history }) => {
    const handleGoBack = () => { history.goBack() }
    const [loading] = useState(false)

    const [newProject, setNewProject] = useState({ name: '', description: '' })
    const handleFormChange = e => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };
    const handleCreate = () => 0;
    const allFieldsFilled = newProject.name && newProject.description

    return (
        <div>
            <Breadcrumb path={history.location.pathname} goBack={handleGoBack} />
            <Title title='New Project'/>

            <form onSubmit={e => e.preventDefault()} className='flex flex-col space-y-2'>
                <label htmlFor='name'>Name</label>
                <input autoFocus type="text" name="name" onChange={handleFormChange} />
                <label htmlFor='description'>Description</label>
                <input type="description" name="description" onChange={handleFormChange} />
                <BtnPrimary onClick={handleCreate} disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <BtnLink onClick={handleGoBack} disabled={loading}>Cancel</BtnLink>
            </form>
        </div>
    )
}

export default ProjectCreate