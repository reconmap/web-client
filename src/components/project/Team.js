import React from 'react'
import { Link } from 'react-router-dom'
import { IconUserGroup } from './../icons'
import UserAvatar from './../badges/UserAvatar'

const ProjectTeam = ({project, users}) => {
    return (
        <section className='mb-4'>
        <div className='heading'>
            <h2>Team</h2>
            <Link to={`/project/${project.id}/membership`}>
                <button className='sm'><IconUserGroup styling='mr-2' /> Manage project membership</button>
            </Link>
        </div>
        {users &&  <div className='flex flex-wrap  '>
       
                {users.map((user, index) =>
                    <Link to={`/user/${user.id}`}>
                        <div className='flex flex-col rounded border-2 border-transparent hover:border-gray-800 p-2 mx-2 w-32 items-center'>
                            <UserAvatar email={user.email} size={16} />
                            <small className='text-gray-500 mt-2'>{user.name}</small>
                        </div>
                    </Link>
                )}
            
        </div>}
            {/* {users && <ul>
                {users.map((user, index) =>
                    <li ><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                )}
            </ul>} */}
        </section>
    )
}

export default ProjectTeam