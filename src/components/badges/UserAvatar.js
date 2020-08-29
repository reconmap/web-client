import React from 'react'
import MD5 from '../../services/md5';

export default function UserAvatar({email, size=32}) {
    return (
        <figure className={`w-${size} h-${size} flex bg-gray-800 overflow-hidden shadow-lg rounded-full mr-10`}>{email&&<img alt='Avatar' src={`https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`} />}</figure>
    )
}
