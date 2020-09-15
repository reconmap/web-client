import React from 'react'

export default function BadgeOutline({children, color='gray', size='base'}) {
    return (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border-2 border-${color}-500 text-${color}-500`}>
            {children}
        </span>
    )
}
