import React from 'react'

export default function StatusBadge({ status }) {
    const STATUSES = {
        0: { color: 'gray' },
        1: { color: 'green' },
    }
    return (

        <div className={`p-1 h-4 w-32 flex justify-start items-center  rounded-full bg-gray-800 text-black uppercase font-semibold `}>
            <div className={` h-2 ${status === 0 ? 'w-2' : 'w-full'} rounded-full bg-${STATUSES[status].color}-500`}> </div>
        </div>
    )
}
