import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import AuditLogsTable from '../auditlog/AuditLogsTable';
import Timestamps from "../ui/Timestamps";
import Title from '../ui/Title';
import {Link, useHistory} from "react-router-dom";
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from "../ui/buttons/Delete";
import useDelete from "../../hooks/useDelete";
import LinkButton from "../ui/buttons/Link";

const UserProfile = ({match}) => {
    useSetTitle('User');

    const history = useHistory();

    const userId = match.params.userId;
    const [user] = useFetch(`/users/${userId}`)
    const [auditLog] = useFetch(`/users/${userId}/activity`)
    const deleteUser = useDelete('/users/');

    const onDeleteButtonClick = ev => {
        ev.preventDefault();

        deleteUser(userId).then(() => {
            history.push('/users');
        })
    }

    if (!user) return <Loading/>

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
                <ButtonGroup>
                    <LinkButton href={`/users/${user.id}/edit`}>Edit</LinkButton>
                    <DeleteButton onClick={onDeleteButtonClick}/>
                </ButtonGroup>
            </div>
            <div>
                <div>
                    {user ?
                        <>
                            <Title type='User profile' title={user.name}
                                   icon={<UserAvatar email={user.email} size='--iconSizeXLarge'/>}/>
                            <div><Timestamps insertTs={user.insert_ts} updateTs={user.update_ts}/></div>
                            <UserRoleBadge role={user.role}/><br/>

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
