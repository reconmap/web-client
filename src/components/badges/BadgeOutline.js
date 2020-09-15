import React from 'react'

export default function BadgeOutline({children}) {
    return (
        <span className='px-2 py-1 border-2 border-smoke-50 rounded-lg font-medium'>
            {children}
        </span>
    )
}
