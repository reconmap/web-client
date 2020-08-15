import React from 'react'
import useFetch from '../../hooks/useFetch'

const Tasks = () => {
    const {data, } = useFetch('https://jsonplaceholder.typicode.com/todos') 
    
    return <div>
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
    </div>
}

export default Tasks