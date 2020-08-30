import React from 'react'

export default function TaskCompletedBadge({completed}) {
    return (
        <div className={`w-12 h-3 rounded-full border-4 border-gray-800 bg-${ completed? 'green':'red'}-500`}></div>
    )
}
