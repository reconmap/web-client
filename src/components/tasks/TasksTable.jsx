import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import RestrictedComponent from "components/logic/RestrictedComponent";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ReloadButton from 'components/ui/buttons/Reload';
import LoadingTableRow from 'components/ui/tables/LoadingTableRow';
import NoResultsTableRow from 'components/ui/tables/NoResultsTableRow';
import React from "react";
import BadgeOutline from '../badges/BadgeOutline';
import LinkButton from "../ui/buttons/Link";
import UserLink from "../users/Link";
import TaskBadge from "./TaskBadge";
import TaskStatusFormatter from "./TaskStatusFormatter";

const TasksTable = ({ tableModel, tableModelSetter: setTableModel, destroy, reloadCallback = null }) => {
    const showSelection = tableModel.columnsVisibility.selection;
    const showProjectColumn = tableModel.columnsVisibility.project;
    const numColumns = 6 + (showSelection ? 1 : 0) + (showProjectColumn ? 1 : 0);

    const onSelectionChange = ev => {
        const target = ev.target;
        const selectionId = parseInt(target.value);
        if (target.checked) {
            setTableModel({ ...tableModel, selection: [...tableModel.selection, selectionId] })
        } else {
            setTableModel({ ...tableModel, selection: tableModel.selection.filter(value => value !== selectionId) })
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
            {null === tableModel.tasks && <LoadingTableRow numColumns={numColumns} />}
            {null !== tableModel.tasks && 0 === tableModel.tasks.length && <NoResultsTableRow numColumns={numColumns} />}
            {null !== tableModel.tasks && tableModel.tasks.map(task =>
                <Tr key={task.id}>
                    {showSelection &&
                        <Td>
                            <input
                                type="checkbox"
                                value={task.id}
                                onChange={onSelectionChange}
                                checked={tableModel.selection.includes(task.id)}
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
                    <Td textAlign="right">
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
