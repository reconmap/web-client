import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import RestrictedComponent from "components/logic/RestrictedComponent";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ReloadButton from 'components/ui/buttons/Reload';
import React from "react";
import BadgeOutline from '../badges/BadgeOutline';
import LinkButton from "../ui/buttons/Link";
import NoResults from "../ui/NoResults";
import UserLink from "../users/Link";
import TaskBadge from "./TaskBadge";
import TaskStatusFormatter from "./TaskStatusFormatter";

const TasksTable = ({ tasks, selectedTasks, setSelectedTasks, filter = { project: '', status: '' }, destroy, showProjectColumn = true, reloadCallback = null }) => {

    const showSelection = selectedTasks !== undefined;
    const numColumns = 6 + (showSelection ? 1 : 0) + (showProjectColumn ? 1 : 0);

    const onSelectionChange = ev => {
        const target = ev.target;
        const targetId = parseInt(target.value);
        if (target.checked) {
            setSelectedTasks([...selectedTasks, targetId]);
        } else {
            setSelectedTasks(selectedTasks.filter(value => value !== targetId));
        }
    };

    return <Table>
        <Thead>
            <Tr>
                {showSelection && <Th style={{ width: "32px" }}>&nbsp;</Th>}
                <Th>Summary</Th>
                <Th className='only-desktop'>Description</Th>
                {showProjectColumn && <Th>Project</Th>}
                <Th>Priority</Th>
                <Th>Assignee</Th>
                <Th style={{ width: '100px' }}>Status</Th>
                <Th colSpan={reloadCallback ? 1 : 2}>Command</Th>
                {reloadCallback && <Th style={{ width: '15%', textAlign: 'right' }}><ReloadButton onClick={reloadCallback} /></Th>}
            </Tr>
        </Thead>
        <Tbody>
            {tasks.length === 0 ?
                <Tr>
                    <Td colSpan={numColumns}><NoResults /></Td>
                </Tr> :
                tasks
                    .filter(task => task.project_id.toString().includes(filter.project))
                    .filter(task => task.status.includes(filter.status))
                    .map((task) =>
                        <Tr key={task.id}>
                            {showSelection &&
                                <Td>
                                    <input
                                        type="checkbox"
                                        value={task.id}
                                        onChange={onSelectionChange}
                                        checked={selectedTasks.includes(task.id)}
                                    />
                                </Td>
                            }
                            <Td><TaskBadge task={task} /></Td>
                            <Td className="only-desktop">{task.description ? task.description.substring(0, 100) + "..." : "-"}</Td>
                            {showProjectColumn && <Td><ProjectBadge project={{ id: task.project_id, name: task.project_name }} /></Td>}
                            <Td>{task.priority}</Td>
                            <Td  >{task.assignee_uid ?
                                <UserLink userId={task.assignee_uid}>{task.assignee_full_name}</UserLink> : '(nobody)'}</Td>
                            <Td><TaskStatusFormatter task={task} /></Td>
                            <Td>{task.command_name ? <BadgeOutline>{task.command_name}</BadgeOutline> : '-'}</Td>
                            <Td className='flex justify-end'>
                                <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                                    <LinkButton href={`/tasks/${task.id}/edit`}>Edit</LinkButton>
                                    {destroy && <DeleteIconButton onClick={() => destroy(task.id)} />}
                                </RestrictedComponent>
                            </Td>
                        </Tr>
                    )}
        </Tbody>
    </Table>
}

export default TasksTable;
