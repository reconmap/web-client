import React from 'react'

export default function UserBadge({name, role}) {
    return (
        <div className=' base-reactive base-user flex items-center flex-row px-3 py-2 rounded-lg  border-gray-800' >
            <figure className='border-2 border-white w-16 h-16 bg-gray-800 rounded-full mr-3' />
            <div>
                <h3 className=' text-white'>{name}</h3>
                <p>{role}</p>
            </div>
        </div>
    )
}
