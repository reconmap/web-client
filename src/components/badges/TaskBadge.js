import React from 'react'

export default function TaskBadge({task}) {
    return (
        <article className='base base-task'>
            <code className='text-gray-600'>{task.code}</code>
            <h5 className='base-subtitle'>{task.title}</h5>
        </article>
    )
}
