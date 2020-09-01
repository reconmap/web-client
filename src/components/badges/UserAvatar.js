import React from 'react'
import MD5 from '../../services/md5';

export default function UserAvatar({email, size=32}) {
    return (
        <figure className={`w-${size} h-${size} hover:border-gray-700 border-2 border-transparent flex bg-gray-800 overflow-hidden shadow-lg rounded-full `}>{email&&<img alt='Avatar' src={`https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`} />}</figure>
    )
}
