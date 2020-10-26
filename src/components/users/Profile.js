import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import AuditLogsTable from '../tables/AuditLogsTable';
import Timestamps from "../ui/Timestamps";
import Title from '../ui/Title';
import { IconBookOpen, IconDocument } from '../icons';

const UserProfile = ({match, history}) => {
    useSetTitle('User');
    const [user] = useFetch(`/users/${match.params.id}`)
    const [auditLog] = useFetch(`/users/${match.params.id}/activity`)
    return (
        <>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'200px 1fr .5fr', gap:'var(--padding)'}}>
                {user ? <div style={{ display:'flex', width:'200px', flexDirection:'column', alignItems:'flex-start'}}>
                            <UserAvatar email={user.email} size='--iconSizeXLarge'/> 
                            <h1>{user.name}</h1>
                            <UserRoleBadge role={user.role}/>

                        </div> : <Loading/>}
                <div>
                    <Title type='User' title='Activity' icon={<IconBookOpen />}/>
                    {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true"/> : <Loading/>}
                </div>
                <div>
                {user ? 
                <>
                <Title type='User' title='Details' icon={<IconDocument />}/>

                <Timestamps insertTs={user.insert_ts} updateTs={user.update_ts}/>
                         
                            <dl>
                                <dt>Timezone</dt>
                                <dd>{user.timezone}</dd>
                            </dl>
                </>
                            : <Loading/>}
                </div>

            </div>
        </>
    )
}

export default UserProfile
