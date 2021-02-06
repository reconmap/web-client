import TimestampsSection from "components/ui/TimestampsSection";
import { Link, useHistory } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import AuditLogsTable from '../auditlog/AuditLogsTable';
import UserAvatar from '../badges/UserAvatar';
import UserRoleBadge from '../badges/UserRoleBadge';
import Breadcrumb from '../ui/Breadcrumb';
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import Loading from '../ui/Loading';
import Title from '../ui/Title';

const UserProfile = ({ match }) => {
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

    if (!user) return <Loading />

    return (
        <>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/users">Users</Link>
                </Breadcrumb>
                <ButtonGroup>
                    <LinkButton href={`/users/${user.id}/edit`}>Edit</LinkButton>
                    <DeleteButton onClick={onDeleteButtonClick} />
                </ButtonGroup>
            </div>
            <div>
                {user ?
                    <>
                        <Title type='User profile' title={user.full_name}
                            icon={<UserAvatar email={user.email} size='--iconSizeXLarge' />} />

                        <div className="flex">
                            <div className="half">
                                <h4>Details</h4>
                                <dl>
                                    <dt>Role</dt>
                                    <dd><UserRoleBadge role={user.role} /><br /></dd>

                                    <dt>Timezone</dt>
                                    <dd>{user.timezone}</dd>
                                </dl>
                            </div>

                            <div className="push-right">
                                <TimestampsSection entity={user} />
                            </div>
                        </div>

                        <h4>Activity (<Link to="/auditlog">view full audit log</Link>)</h4>
                        {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true" /> : <Loading />}
                    </>
                    : <Loading />}
            </div>
        </>
    )
}

export default UserProfile
