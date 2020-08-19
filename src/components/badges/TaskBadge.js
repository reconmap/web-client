import React from 'react'

export default function TaskBadge({task}) {
    return (
        <article className='base base-task'>
            <p className='font-mono'>{task.code}</p>
            <h2>{task.title}</h2>
        </article>
    )
}
