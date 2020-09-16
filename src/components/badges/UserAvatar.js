import React from 'react'
import MD5 from '../../services/md5';

export default function UserAvatar({email, size=32, onClick}) {
    return (
        <figure 
            onClick={onClick} 
            className={`w-${size} h-${size} ${onClick && 'cursor-pointer'}  hover:shadow-outline flex bg-invert overflow-hidden shadow rounded-full `}>
            {email&&<img alt='Avatar' src={`https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`} />}
        </figure>
    )
}
