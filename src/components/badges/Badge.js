import React from 'react'

export default function Badge ({children, color='gray', fontSize='text-sm', icon}) {
    return (
        <span className={`px-2 py-1 inline-flex items-center leading-5 font-semibold rounded border-2 border-transparent bg-${color}-300 text-${color}-700 ${fontSize}`}>
            {icon}
            {children}
        </span>
    )
}
