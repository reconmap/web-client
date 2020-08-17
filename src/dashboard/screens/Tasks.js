import React from 'react'
import TaskBadge from '../../components/badges/TaskBadge';

const Tasks = () => {
    React.useEffect(() => { document.title = 'Tasks | Reconmap'; },[]);

    const TASKS = [
        { title: 'Computer OS fingerprint probe', code: 'nmap -v -O target_IP' },
        { title: 'Network or Port Scan', code: 'nmap -v -sS target_IP' },
        { title: 'TCP Null Scan', code: 'nmap -v -sN target_IP' },
        { title: 'TCP SYNFIN Scan', code: 'nmap -v —scanflags SYNFIN target_IP' },
        { title: 'TCP Xmas Scan', code: 'nmap -v -sX target_IP' },
    ]
    return <>
        <h1>Tasks</h1>
        <div className='flex flex-wrap gap-4'>
            {TASKS.map(task => <TaskBadge task={task} key={task.id} /> )}
        </div>

    </>
}

export default Tasks