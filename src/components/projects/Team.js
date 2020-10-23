import {useHistory} from 'react-router-dom'
import UserAvatar from './../badges/UserAvatar'

const ProjectTeam = ({project, users}) => {
    const history = useHistory()
    const handleOnClick = id => {
        history.push(`/users/${id}`)
    }

    return (

        <div className='flex px-2 py-2 -space-x-3 mr-auto ml-3 '>
            {users && users.map((user, index) =>
                <UserAvatar
                    key={index}
                    email={user.email}
                    size={12}
                    onClick={() => handleOnClick(user.id)}
                    name={user.name}
                    tooltip/>
            )}
        </div>
    )
}

export default ProjectTeam