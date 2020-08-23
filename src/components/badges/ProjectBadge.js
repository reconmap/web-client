import React from 'react'
import { IconDocument } from '../icons'

export default function ProjectBadge({name}) {
   
    return (
        <div className={`px-2  flex justify-between items-center border-l-2 border-red-500  py-1 rounded bg-gray-800 text-black uppercase font-semibold text-white `}>
            <IconDocument styling='mr-2 '/>
            <span className='flex-1 w-32 truncate'>
                {name} 
            </span>
                
        </div>
    )
}
