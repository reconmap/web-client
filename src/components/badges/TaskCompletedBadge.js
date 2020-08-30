import React from 'react'

export default function TaskCompletedBadge({completed}) {
    return (
        <div className={`w-12 h-4 rounded-full border-4 border-gray-800 bg-${ completed==='1'? 'green':'red'}-500`}></div>
    )
}
