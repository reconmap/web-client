import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import AuditLogsTable from '../auditlog/AuditLogsTable';
import Timestamps from "../ui/Timestamps";
import Title from '../ui/Title';
import {Link} from "react-router-dom";

const UserProfile = ({match}) => {
    useSetTitle('User');
    const userId = match.params.id;
    const [user] = useFetch(`/users/${userId}`)
    const [auditLog] = useFetch(`/users/${userId}/activity`)
    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
            </div>
            <div>
                <div>
                    {user ?
                        <>
                            <Title type='User' title='Profile'
                                   icon={<UserAvatar email={user.email} size='--iconSizeXLarge'/>}/>
                            <h1>{user.name}</h1>
                            <UserRoleBadge role={user.role}/><br/>
                            <Timestamps insertTs={user.insert_ts} updateTs={user.update_ts}/>

                            <h4>Details</h4>
                            <dl>
                                <dt>Timezone</dt>
                                <dd>{user.timezone}</dd>
                            </dl>

                            <h4>Activity</h4>
                            {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true"/> : <Loading/>}
                        </>
                        : <Loading/>}
                </div>

            </div>
        </>
    )
}

export default UserProfile
