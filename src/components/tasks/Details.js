import { HStack, Select } from '@chakra-ui/react'
import AttachmentsTable from 'components/attachments/AttachmentsTable'
import AttachmentsDropzone from 'components/attachments/Dropzone'
import CommandOutputs from 'components/commands/Outputs'
import PageTitle from 'components/logic/PageTitle'
import RestrictedComponent from 'components/logic/RestrictedComponent'
import EmptyField from 'components/ui/EmptyField'
import RelativeDateFormatter from 'components/ui/RelativeDateFormatter'
import TimestampsSection from 'components/ui/TimestampsSection'
import UserLink from 'components/users/Link'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from "react-router-dom"
import useDelete from '../../hooks/useDelete'
import TaskStatuses from "../../models/TaskStatuses"
import secureApiFetch from '../../services/api'
import Breadcrumb from "../ui/Breadcrumb"
import DeleteButton from "../ui/buttons/Delete"
import PrimaryButton from '../ui/buttons/Primary'
import { IconClipboard, IconDocument } from '../ui/Icons'
import Loading from '../ui/Loading'
import Tab from '../ui/Tab'
import Tabs from '../ui/Tabs'
import { actionCompletedToast } from "../ui/toast"
import useFetch from './../../hooks/useFetch'
import Title from './../ui/Title'
import TaskCommandTab from './CommandTab'
import TaskStatusFormatter from "./TaskStatusFormatter"

const TaskDetails = ({ history, match }) => {
    const taskId = match.params.taskId;
    const [task, fetchTask] = useFetch(`/tasks/${taskId}`)
    const [users] = useFetch(`/users`)
    const [project, setProject] = useState(null);

    const parentType = 'task';
    const parentId = taskId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`)

    const destroy = useDelete('/tasks/', fetchTask);

    const handleDelete = () => {
        destroy(task.id);
        history.push('/tasks');
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
            secureApiFetch(`/projects/${task.project_id}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(project => {
                    setProject(project);
                })
                .catch(err => console.error(err))
        }
    }, [task])

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/tasks">Tasks</Link>
                    {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
                </Breadcrumb>
                {task && users &&
                    <HStack alignItems='flex-end'>
                        <RestrictedComponent roles={['administrator', 'superuser', 'user']}>
                            <PrimaryButton to={`/tasks/${task.id}/edit`}>Edit</PrimaryButton>
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
                        <Tab name="Details">
                            <div className="grid grid-two">
                                <div>
                                    <h4>Description</h4>
                                    {task.description ? <ReactMarkdown>{task.description}</ReactMarkdown> : <EmptyField />}
                                    <h4>Status</h4>
                                    <p style={{ display: 'flex', alignItems: 'center', columnGap: 'var(--margin)' }}>
                                        <TaskStatusFormatter task={task} />
                                    </p>
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
                                                        <option key={index} value={user.id}>{user.full_name}</option>
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
                        </Tab>
                        {task.command_id &&
                            <Tab name="Command instructions">
                                <TaskCommandTab task={task} />
                            </Tab>
                        }
                        {task.command_id &&
                            <Tab name="Command outputs">
                                <CommandOutputs task={task} />
                            </Tab>
                        }
                        <Tab name="Attachments">
                            <AttachmentsDropzone parentType={parentType} parentId={parentId} onUploadFinished={reloadAttachments} />

                            <h4><IconDocument />Attachment list</h4>
                            <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                        </Tab>
                    </Tabs>
                </article>
            }
        </div >
    )
}

export default TaskDetails;
