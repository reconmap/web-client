import React from 'react'
import { Link } from 'react-router-dom'

const ProjectTeam = ({project, users}) => {
    return (
        <section>
            <h2>Team</h2>
            <Link to={`/project/${project.id}/membership`}>Manage project membership</Link>
            {users && <ul>
                {users.map((user, index) =>
                    <li ><Link to={`/user/${user.id}`}>{user.name}</Link></li>
                )}
            </ul>}
        </section>
    )
}

export default ProjectTeam