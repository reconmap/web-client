import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconUserGroup } from './../icons'
import UserAvatar from './../badges/UserAvatar'
import BtnLink from '../ui/buttons/BtnLink'

const ProjectTeam = ({ project, users }) => {
    const history = useHistory()
    const handleOnClick = id => {
        history.push(`/users/${id}`)
    }
    return (

        <div className='flex px-2 py-2 space-x-2 '>
            { users && users.map((user, index) =>
                <UserAvatar key={index} email={user.email} size={8} onClick={()=>handleOnClick(user.id)} name={user.name} tooltip/>
            )}
            <BtnLink size='xs' color='gray'> Manage Members <IconUserGroup size={4} color='gray' styling='ml-2'/></BtnLink>
        </div>
    )
}

export default ProjectTeam