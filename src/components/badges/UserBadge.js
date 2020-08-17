import React from 'react'

export default function UserBadge({name, role}) {
    return (
        <div className=' base-reactive base-user flex items-center flex-row px-3 py-2 rounded-lg  border-gray-800' >
            <figure className='w-16 h-16 bg-gray-800 rounded-full mr-3' />
            <div>
                <h6 className='base-desc text-white'>{name}</h6>
                <p className='text-sm text-gray-600'>{role}</p>
            </div>
        </div>
    )
}
