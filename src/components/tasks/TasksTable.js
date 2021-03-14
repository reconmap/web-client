import React from "react";
import BadgeOutline from '../badges/BadgeOutline';
import DeleteButton from "../ui/buttons/Delete";
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import UserLink from "../users/Link";
import TaskBadge from "./TaskBadge";
import TaskStatusFormatter from "./TaskStatusFormatter";

const TasksTable = ({ tasks, selectedTasks, setSelectedTasks, filter = { project: '', status: '' }, destroy }) => {

    const onTaskCheckboxChange = (ev) => {
        const target = ev.target;
        const targetId = parseInt(target.value);
        if (target.checked) {
            setSelectedTasks([...selectedTasks, targetId]);
        } else {
            setSelectedTasks(selectedTasks.filter(value => value !== targetId));
        }
    };

    return (
        <table>
            <thead>
                <tr>
                    {selectedTasks && <th style={{ width: "32px" }}>&nbsp;</th>}
                    <th style={{ width: '190px' }}>Summary</th>
                    <th className='only-desktop'>Description</th>
                    <th style={{ width: '190px' }}>Project</th>
                    <th style={{ width: '12ch' }}>Assignee</th>
                    <th style={{ width: '100px' }}>Status</th>
                    <th>Command</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {tasks.length === 0 ?
                    <tr>
                        <td colSpan="6"><NoResults /></td>
                    </tr> :
                    tasks
                        .filter(task => task.project_id.toString().includes(filter.project))
                        .filter(task => task.status.includes(filter.status))
                        .map((task) =>
                            <tr key={task.id}>
                                {selectedTasks &&
                                    <td>
                                        <input
                                            type="checkbox"
                                            value={task.id}
                                            onChange={onTaskCheckboxChange}
                                            checked={selectedTasks.includes(task.id)}
                                        />
                                    </td>
                                }
                                <td><TaskBadge task={task} /></td>
                                <td className='only-desktop truncate' >{task.description}</td>
                                <td><a href={`/projects/${task.project_id}`}>{task.project_name}</a></td>
                                <td  >{task.assignee_uid ?
                                    <UserLink userId={task.assignee_uid}>{task.assignee_full_name}</UserLink> : '(nobody)'}</td>
                                <td><TaskStatusFormatter task={task} /></td>
                                <td>{task.command_short_name ? <BadgeOutline>{task.command_short_name}</BadgeOutline> : '-'}</td>
                                <td className='flex justify-end'>
                                    <LinkButton href={`/tasks/${task.id}/edit`}>Edit</LinkButton>
                                    {destroy && <DeleteButton onClick={() => destroy(task.id)} />}
                                </td>
                            </tr>
                        )}
            </tbody>
        </table>
    )
}

export default TasksTable;
