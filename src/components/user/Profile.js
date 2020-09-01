import React from 'react'
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import UserRoleBadge from '../badges/UserRoleBadge';
import UserAvatar from '../badges/UserAvatar';
import AuditLogsTable from '../tables/AuditLogsTable';
import { IconBookOpen } from '../icons';

const UserProfile = ({ match, history }) => {
    useSetTitle('User');
    const [user] = useFetch(`/users/${match.params.id}`)
    const [auditLog] = useFetch(`/users/${match.params.id}/activity`)
    return (
        <div>
            <Breadcrumb path={history.location.pathname}/>
        
            <div className=' flex flex-col md:flex-row items-center justify-center  max-w-xl mx-auto my-10'>
                {user && <UserAvatar email={user.email} size={48}/>}
                {user ? <div className=' flex flex-col flex-1 ml-5'>
                    <h1>{user.name}</h1>
                    <article className='text-gray-600'>
                        User since {user.insert_ts}
                    </article>
                    <div className='flex flex-row gap-4 my-2 font-semibold text-sm'>
                        <UserRoleBadge role={user.role} />
                    </div>
                </div> : <Loading /> }
            </div>
            <section >
            <div className='heading'>
                <IconBookOpen />
                <h2>Activity</h2>
            </div>
                { auditLog ? <AuditLogsTable auditLog={auditLog}/>: <Loading /> }
            </section>

        </div>
    )
}

export default UserProfile
