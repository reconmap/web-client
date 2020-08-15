import React from 'react'
import useFetch from '../../hooks/useFetch'

const Tasks = () => {
    const {data, } = useFetch('https://jsonplaceholder.typicode.com/todos') 
    
    return <>
        <h1>Tasks</h1>
        { data ?
            <div>
            <ul>
                { data.map( task=> 
                    <li key={task.id}>
                    {task.completed ? '✅' : '❌'} {task.title}
                    </li>
                )}
            </ul>
                <h3>Computer OS fingerprint probe</h3>
<code>nmap -v -O target_IP</code>

<h3>Network or Port Scan</h3>
<code>nmap -v -sS target_IP</code>

<h3>TCP Null Scan</h3>
<code>nmap -v -sN target_IP</code>

<h3>TCP SYNFIN Scan</h3>
<code>nmap -v —scanflags SYNFIN target_IP</code>

<h3>TCP Xmas Scan</h3>
<code>nmap -v -sX target_IP</code>
            </div>
            : 'Cargando...'
        }
    </>
}

export default Tasks