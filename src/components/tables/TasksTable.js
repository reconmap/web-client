import React from 'react'
import TaskBadge from '../badges/TaskBadge'
import TaskCompletedBadge from '../badges/TaskCompletedBadge'
import BadgeOutline from '../badges/BadgeOutline'
import BtnPrimary from '../ui/buttons/BtnPrimary'
import {IconUpload} from '../icons'
import DeleteButton from "../ui/buttons/Delete";

export default function TasksTable({tasks, filter = {project: '', status: ''}, destroy}) {
    return (
        <table className='w-full'>
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Parser</th>
                <th>Details</th>
                <th>&nbsp;</th>
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
                        <td><small className='text-gray-600 font-mono'>{task.description.slice(0, 40)} </small></td>
                        <td>
                            <div className='flex space-x-1 justify-end'>
                                <BtnPrimary size='xs' to={"/tasks/" + task.id + "/upload"}><IconUpload styling='mr-2'
                                                                                                       size={4}/> Upload
                                    results</BtnPrimary>
                                <DeleteButton onClick={() => destroy(task.id)}/>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    )
}
