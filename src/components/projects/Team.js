import { useNavigate } from 'react-router-dom';
import UserAvatar from './../badges/UserAvatar';

const ProjectTeam = ({ project, users }) => {
    const navigate = useNavigate();
    const handleOnClick = id => {
        navigate(`/users/${id}`)
    }

    return (
        <div className='flex px-2 py-2 -space-x-2 mr-auto ml-3 '>
            {users && users.map((user, index) =>
                <UserAvatar
                    key={index}
                    email={user.email}
                    onClick={() => handleOnClick(user.id)}
                    name={user.name}
                    tooltip />
            )}
        </div>
    )
}

export default ProjectTeam
