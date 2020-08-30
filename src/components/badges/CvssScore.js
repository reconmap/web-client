import React from 'react'

export default function CvssScore({score}) {
    const color = Math.floor(score) <= 3 ? 'green' : Math.floor(score) <= 6 ? 'yellow' : 'red'
    return (
        <div className='px-2 py-1 h-6 rounded bg-gray-900 flex gap-1 items-center'>
           { Array.from({length:Math.floor(score)}).map( s => 
                <div className={`bg-${color}-500 h-4 w-1 rounded`}></div>
           )} 
           <small className={`ml-1 text-${color}-500`}>{score}</small>
        </div>
    )
}
