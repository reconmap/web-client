import { HStack, Select, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AttachmentsTable from 'components/attachments/AttachmentsTable';
import AttachmentsDropzone from 'components/attachments/Dropzone';
import CommandBadge from 'components/commands/Badge';
import CommandInstructions from 'components/commands/Instructions';
import PageTitle from 'components/logic/PageTitle';
import RestrictedComponent from 'components/logic/RestrictedComponent';
import EmptyField from 'components/ui/EmptyField';
import RelativeDateFormatter from 'components/ui/RelativeDateFormatter';
import TimestampsSection from 'components/ui/TimestampsSection';
import UserLink from 'components/users/Link';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Auth from 'services/auth';
import useDelete from '../../hooks/useDelete';
import TaskStatuses from "../../models/TaskStatuses";
import secureApiFetch from '../../services/api';
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from "../ui/buttons/Delete";
import { IconClipboard, IconDocument } from '../ui/Icons';
import Loading from '../ui/Loading';
import { actionCompletedToast } from "../ui/toast";
import useFetch from './../../hooks/useFetch';
import Title from './../ui/Title';
import TaskStatusFormatter from "./TaskStatusFormatter";

const TaskDetails = () => {
    const loggedInUser = Auth.getLoggedInUser();
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [task, fetchTask] = useFetch(`/tasks/${taskId}`)
    const [users] = useFetch(`/users`)
    const [project, setProject] = useState(null);
    const [command, setCommand] = useState(null);

    const parentType = 'task';
    const parentId = taskId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`)

    const destroy = useDelete('/tasks/', fetchTask);

    const handleDelete = () => {
        destroy(task.id);
        navigate('/tasks');
    }

    const onAssigneeChange = ev => {
        const assigneeUid = ev.target.value;
        secureApiFetch(`/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ assignee_uid: '' === assigneeUid ? null : assigneeUid })
        })
            .then(() => {
                actionCompletedToast("The assignee has been updated.");
                fetchTask()
            })
            .catch(err => console.error(err))
    }

    const onStatusChange = ev => {
        const status = ev.target.value;
        secureApiFetch(`/tasks/${task.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ status: status })
        })
            .then(() => {
                actionCompletedToast("The status has been transitioned.");
                fetchTask()
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (task) {
            if (task.command_id) {
                secureApiFetch(`/commands/${task.command_id}`, { method: 'GET' })
                    .then(resp => resp.json())
                    .then(command => setCommand(command))
                    .catch(err => console.error(err))
            }

            secureApiFetch(`/projects/${task.project_id}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(project => setProject(project))
                .catch(err => console.error(err))
        }
    }, [task])

    return <div>
        <div className="heading">
            <Breadcrumb>
                <Link to="/tasks">Tasks</Link>
                {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
            </Breadcrumb>
            {task && users &&
                <HStack alignItems='flex-end'>
                    <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                        <Link to={`/tasks/${task.id}/edit`}>Edit</Link>
                        <label>Transition to&nbsp;
                            <Select onChange={onStatusChange} value={task.status}>
                                {TaskStatuses.map((status, index) =>
                                    <option key={index} value={status.id}>{status.name}</option>
                                )}
                            </Select>
                        </label>
                        <DeleteButton onClick={() => handleDelete(task.id)} />
                    </RestrictedComponent>
                </HStack>
            }
        </div>
        {!task ? <Loading /> :
            <article>
                <PageTitle value={`${task.summary} task`} />

                <Title title={task.summary} type='Task' icon={<IconClipboard />} />

                <Tabs>
                    <TabList>
                        <Tab>Details</Tab>
                        {null !== command && <Tab>Command instructions</Tab>}
                        <Tab>Attachments</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <div className="grid grid-two">
                                <div>
                                    <h4>Description</h4>
                                    {task.description ? <ReactMarkdown>{task.description}</ReactMarkdown> : <EmptyField />}
                                    <h4>Priority</h4>
                                    <p>{task.priority}</p>
                                    <h4>Status</h4>
                                    <p style={{ display: 'flex', alignItems: 'center', columnGap: 'var(--margin)' }}>
                                        <TaskStatusFormatter task={task} />
                                    </p>
                                    {task.command_id && <>
                                        <h4>Command</h4>
                                        <CommandBadge command={{ id: task.command_id, name: task.command_name }} />
                                    </>}
                                </div>

                                <div>
                                    <h4>People</h4>
                                    <dl>
                                        <dt>Created by</dt>
                                        <dd><UserLink userId={task.creator_uid}>{task.creator_full_name}</UserLink></dd>

                                        <dt>Assigned to</dt>
                                        <dd>
                                            {users &&
                                                <Select onChange={onAssigneeChange} defaultValue={task.assignee_uid}>
                                                    <option value="">(nobody)</option>
                                                    {users.map((user, index) =>
                                                        <option key={index} value={user.id}>{user.full_name}{user.id === loggedInUser.id ? " (You)" : ""}</option>
                                                    )}
                                                </Select>}
                                        </dd>
                                    </dl>

                                    <TimestampsSection entity={task} />
                                    {task.due_date &&
                                        <dl>
                                            <dt>Due date</dt>
                                            <dd><RelativeDateFormatter date={task.due_date} /></dd>
                                        </dl>
                                    }
                                </div>
                            </div>
                        </TabPanel>
                        {null !== command && <TabPanel>
                            <CommandInstructions command={command} task={task} />
                        </TabPanel>}
                        <TabPanel>
                            <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />

                            <h4><IconDocument />Attachment list</h4>
                            <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </article>
        }
    </div>
}

export default TaskDetails;
