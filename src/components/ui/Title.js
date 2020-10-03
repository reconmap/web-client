import React from 'react'

export default function Title({type, title}) {
    return (
        <div className='mt-3 mb-4'>
             {type && <p className='text-sm text-red-500 font-medium tracking-wide uppercase mb-0 '>{type}</p>}
             <h3 className=' text-3xl leading-8 font-extrabold tracking-tight  sm:text-4xl sm:leading-10'>{title}</h3>
        </div>
    )
}
