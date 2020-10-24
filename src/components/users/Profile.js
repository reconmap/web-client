import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import AuditLogsTable from '../tables/AuditLogsTable';
import {IconBookOpen} from '../icons';
import Timestamps from "../ui/Timestamps";

const UserProfile = ({match, history}) => {
    useSetTitle('User');
    const [user] = useFetch(`/users/${match.params.id}`)
    const [auditLog] = useFetch(`/users/${match.params.id}/activity`)
    return (
        <>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>

            <div className=' flex flex-col md:flex-row items-center justify-center  max-w-xl mx-auto my-10'>
                {user && <UserAvatar email={user.email} size='--iconSizeXLarge'/>}
                {user ? <div className=' flex flex-col flex-1 ml-5'>
                    <h1>{user.name}</h1>
                    <Timestamps insertTs={user.insert_ts} updateTs={user.update_ts}/>
                    <div className='flex flex-row gap-4 my-2 font-semibold text-sm'>
                        <UserRoleBadge role={user.role}/>
                    </div>
                    <dl className='text-gray-600'>
                        <dt>Timezone</dt>
                        <dd>{user.timezone}</dd>
                    </dl>
                </div> : <Loading/>}
            </div>
            <section>
                <div className='heading'>
                    <IconBookOpen/>
                    <h2>Activity</h2>
                </div>
                {auditLog ? <AuditLogsTable auditLog={auditLog} hideUserColumns="true"/> : <Loading/>}
            </section>

        </>
    )
}

export default UserProfile
