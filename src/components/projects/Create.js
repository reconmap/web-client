import React, { useState } from 'react'
import Breadcrumb from '../ui/Breadcrumb'

 const  ProjectCreate = ({history}) => {
     const handleGoBack = () => {history.goBack()}
    const [loading] = useState(false)

    const [ newProject, setNewProject ] = useState({name:'',description:''})
     const handleFormChange = e => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };
    const handleCreate = () => 0;
    const allFieldsFilled = newProject.name && newProject.description

    return (
        <div>
            <Breadcrumb path={history.location.pathname} goBack={handleGoBack}/>
            <h1>New Project</h1>
            <form onSubmit={e => e.preventDefault()}>
                <label htmlFor='name'>Name</label>
                <input autoFocus type="text" name="name" onChange={handleFormChange} />
                <label htmlFor='description'>Description</label>
                <input type="description" name="description" onChange={handleFormChange} />
              
                <button onClick={handleCreate} disabled={loading || !allFieldsFilled}>{loading ? 'Wait please' : 'Create'}</button>
                <button onClick={handleGoBack} disabled={loading} type='cancel'>Cancel</button>
            </form>
        </div>
    )
}

export default ProjectCreate