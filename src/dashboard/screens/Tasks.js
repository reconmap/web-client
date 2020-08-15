import React from 'react'
import useFetch from '../../hooks/useFetch'

const Tasks = () => {
    const {data, } = useFetch('https://jsonplaceholder.typicode.com/todos') 
    
    return <>
        <h1>Tasks</h1>
        { data ?
            <ul>
                { data.map( task=> 
                    <li key={task.id}>
                    {task.completed ? '✅' : '❌'} {task.title}
                    </li>
                )}
            </ul>
            : 'Cargando...'
        }
    </>
}

export default Tasks