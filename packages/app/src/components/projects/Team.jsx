import { Link } from "react-router-dom";
import UserAvatar from "./../badges/UserAvatar";

const ProjectTeam = ({ project, users }) => {
    return (
        <div className="flex px-2 py-2 -space-x-2 mr-auto ml-3 ">
            {users &&
                users.map((user, index) => (
                    <Link to={`/users/${user.id}`}>
                        <UserAvatar key={index} email={user.email} />
                    </Link>
                ))}
        </div>
    );
};

export default ProjectTeam;
