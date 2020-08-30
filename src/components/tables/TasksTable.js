import React from 'react'
import TaskBadge from '../badges/TaskBadge'
import TaskCompletedBadge from '../badges/TaskCompletedBadge'
import BadgeOutline from '../badges/BadgeOutline'
import { Link } from 'react-router-dom'
import DeleteButton from '../ui/buttons/Delete'

export default function TasksTable({tasks, filter={project:'', status:''}, destroy}) {
    return (
        <table className='w-full'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Parser</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks
                        .filter(task => task.project_id.toString().includes(filter.project))
                        .filter(task => task.completed.toString().includes(filter.status))
                        .map((task) =>
                            <tr key={task.id}>
                                <td><TaskBadge task={task}/></td>
                                <td><TaskCompletedBadge completed={task.completed}/></td>
                                <td>{task.parser && <BadgeOutline>{task.parser}</BadgeOutline>}</td>
                                <td><small className='text-gray-600 font-mono'>{task.description.slice(0,40)} </small></td>
                                <td>
                                    <div className='flex-col flex'>
                                        <Link  to={"/tasks/" + task.id + "/upload"}><button className='mb-1 w-full'>Upload results</button></Link>
                                        <DeleteButton onClick={() => destroy(task.id)} />
                                    </div>
                                </td>
                            </tr>
                        )}
                </tbody>
            </table>

    )
}
