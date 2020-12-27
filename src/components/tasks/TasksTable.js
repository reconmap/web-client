import TaskBadge from '../badges/TaskBadge'
import TaskStatusBadge from '../badges/TaskStatusBadge'
import BadgeOutline from '../badges/BadgeOutline'
import PrimaryButton from '../ui/buttons/Primary'
import {IconUpload} from '../ui/Icons'
import UserLink from "../users/Link";
import NoResults from "../ui/NoResults";
import React from "react";
import DeleteButton from "../ui/buttons/Delete";

export default function TasksTable({tasks, filter = {project: '', status: ''}, destroy}) {
    return (
        <table>
            <thead>
            <tr>
                <th style={{width: '190px'}}>Name</th>
                <th>Description</th>
                <th style={{width: '190px'}}>Project</th>
                <th>Assignee</th>
                <th style={{width: '100px'}}>Status</th>
                <th>Command parser</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {tasks.length === 0 ?
                <tr>
                    <td colSpan="6"><NoResults/></td>
                </tr> :
                tasks
                    .filter(task => task.project_id.toString().includes(filter.project))
                    .filter(task => task.completed.toString().includes(filter.status))
                    .map((task) =>
                        <tr key={task.id}>
                            <td><TaskBadge task={task}/></td>
                            <td style={{width: '20%'}}>{task.description.slice(0, 40)}</td>
                            <td><a href={`/projects/${task.project_id}`}>{task.project_name}</a></td>
                            <td>{task.assignee_uid ?
                                <UserLink userId={task.assignee_uid}>{task.assignee_name}</UserLink> : '(nobody)'}</td>
                            <td><TaskStatusBadge completed={task.completed}/></td>
                            <td>{task.command_parser && <BadgeOutline>{task.command_parser}</BadgeOutline>}</td>
                            <td>
                                <PrimaryButton to={`/tasks/${task.id}/upload`}>
                                    <IconUpload/>
                                    Upload results
                                </PrimaryButton>
                                <DeleteButton onClick={() => destroy(task.id)}/>
                            </td>
                        </tr>
                    )}
            </tbody>
        </table>
    )
}
