import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import BooleanText from "components/ui/BooleanText";
import EmptyField from "components/ui/EmptyField";
import Tab from "components/ui/Tab";
import Tabs from 'components/ui/Tabs';
import TimestampsSection from "components/ui/TimestampsSection";
import { Link, useHistory } from "react-router-dom";
import useDelete from "../../hooks/useDelete";
import useFetch from '../../hooks/useFetch';
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
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        <LinkButton href={`/users/${user.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={onDeleteButtonClick} />
                    </RestrictedComponent>
                </ButtonGroup>
            </div>
            <div>
                <PageTitle value={`${user.full_name} user`} />

                <Title type='User profile' title={user.full_name}
                    icon={<UserAvatar email={user.email} />} />
                <Tabs>

                    <Tab name="Details">
                        <div className="grid grid-two">
                            <div>
                                <h4>Properties</h4>
                                <dl>
                                    <dt>Short bio</dt>
                                    <dd>{user.short_bio ? user.short_bio : <EmptyField />}</dd>

                                    <dt>Role</dt>
                                    <dd><UserRoleBadge role={user.role} /><br /></dd>

                                    <dt>Timezone</dt>
                                    <dd>{user.timezone}</dd>

                                    <dt>Active?</dt>
                                    <dd><BooleanText value={user.active} /></dd>

                                    <dt>2FA enabled?</dt>
                                    <dd><BooleanText value={user.mfa_enabled} /></dd>
                                </dl>
                            </div>

                            <div>
                                <TimestampsSection entity={user} />
                            </div>
                        </div>
                    </Tab>

                    <Tab name="Activity">
                        <h4>Activity (<Link to="/auditlog">view full audit log</Link>)</h4>
                        {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true" /> : <Loading />}
                    </Tab>
                </Tabs>
            </div>
        </>
    )
}

export default UserProfile;
