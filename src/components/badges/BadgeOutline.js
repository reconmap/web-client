import React from 'react'

export default function BadgeOutline({children}) {
    return (
        <small className='px-2 py-1 border-2 border-gray-800 text-gray-500 rounded-lg font-medium'>
            {children}
        </small>
    )
}
