import React from 'react'
import MD5 from '../../services/md5';

export default function UserAvatar({email, size=32, onClick, name, tooltip}) {
    return (
        <figure 
            onClick={onClick} 
            className={`w-${size} h-${size} ${onClick && 'cursor-pointer'} group border-2 border-smoke hover:shadow-outline flex bg-invert  shadow rounded-full relative`}>

            {email && <img 
                        alt={name||'Avatar' }
                        className='rounded-full' 
                        src={`https://www.gravatar.com/avatar/${MD5(email)}?s=200&d=robohash`} 
                        />}
            {tooltip && <div className='absolute bottom-0 p-1 bg-invert shadow rounded -mb-8 text-xs left-0 right-0 mx-auto hidden group-hover:block'>{name}</div>}
        </figure>
    )
}
