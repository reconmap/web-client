import React from 'react'

export default function Title({type, title}) {
    return (
        <div className='my-2'>
             {type && <p className='text-base leading-6 text-red-500 font-semibold tracking-wide uppercase'>{type}</p>}
             <h3 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight  sm:text-4xl sm:leading-10'>{title}</h3>
        </div>
    )
}
