import React from 'react'
import MD5 from '../../services/md5';
import Loading from '../ui/Loading';
import useFetch from '../../hooks/useFetch';
import useSetTitle from '../../hooks/useSetTitle';

const UserProfile = ({ match }) => {
    useSetTitle('User');
    const [user, updateUser] = useFetch(`/users/${match.params.id}`)
    const [auditLog, updateAuditLog] = useFetch(`/users/${match.params.id}/activity`)
    return (
        <div>
            <div className=' flex flex-col md:flex-row items-center justify-center  max-w-xl mx-auto my-10'>
                <figure className='w-48 h-48 flex bg-gray-800 overflow-hidden shadow-lg rounded-full mr-10'>{user&&<img alt='Avatar' src={`https://www.gravatar.com/avatar/${MD5(user.email)}?s=200&d=robohash`} />}</figure>
                {user ? <div className=' flex flex-col flex-1'>
                    <h1>{user.name}</h1>
                    <article className='text-gray-600'>
                        User since {user.insert_ts}
                    </article>
                    <div className='flex flex-row gap-4 my-2 font-semibold text-sm'>
                        <span className='px-3 py-1 rounded-full bg-red-500 text-black'>{user.role}</span>
                    </div>
                </div> : <Loading /> }
            </div>
            <article className='base max-w-lg mx-auto'>
                <h3 className='base-subtitle'>Activity</h3>
                { auditLog ?
                <ul>
                    { auditLog.map((log, index) => <li key={index}><date>{log.insert_ts}</date> {log.action}</li>)}
                </ul>: <Loading /> }
            </article>

        </div>
    )
}

export default UserProfile
