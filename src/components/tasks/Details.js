import React, { useEffect, useState } from 'react'
import secureApiFetch from '../../services/api'
import PrimaryButton from '../ui/buttons/Primary'
import { IconClipboard } from '../ui/Icons'
import Title from './../ui/Title'
import ButtonGroup from "../ui/buttons/ButtonGroup";
import DeleteButton from "../ui/buttons/Delete";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from '../ui/Loading'
import Timestamps from "../ui/Timestamps";
import { actionCompletedToast } from "../ui/toast";
import useFetch from './../../hooks/useFetch'
import useDelete from '../../hooks/useDelete'
import { Link } from "react-router-dom";
import TextBlock from "../ui/TextBlock";
import TaskStatusFormatter from "./TaskStatusFormatter";
import TaskStatuses from "../../models/TaskStatuses";
import Tabs from '../ui/Tabs'
import Tab from '../ui/Tab'
import TaskCommandTab from './CommandTab'
import UserLink from 'components/users/Link'

const TaskDetails = ({ history, match }) => {
    const taskId = match.params.taskId;
    const [task, fetchTask] = useFetch(`/tasks/${taskId}`)
    const [users] = useFetch(`/users`)
    const [project, setProject] = useState(null);
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
            document.title = `Task ${task.name} | Reconmap`;

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
                    <ButtonGroup>
                        <PrimaryButton to={`/tasks/${task.id}/edit`}>Edit</PrimaryButton>
                        <label>Transition to&nbsp;
                        <select onChange={onStatusChange} value={task.status}>
                                {TaskStatuses.map((status, index) =>
                                    <option key={index} value={status.id}>{status.name}</option>
                                )}
                            </select>
                        </label>
                        <DeleteButton onClick={() => handleDelete(task.id)} />
                    </ButtonGroup>
                }
            </div>
            {!task ? <Loading /> :
                <article>
                    <Title title={task.name} type='Task' icon={<IconClipboard />} />
                    <Timestamps insertTs={task.insert_ts} updateTs={task.update_ts} />
                    <Tabs>
                        <Tab name="Details">
                            <div className="grid md:grid-cols-3">
                                <div className="col-span-2">
                                    <h4>Description</h4>
                                    <TextBlock value={task.description || "(empty)"} />
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
                                            <select onChange={onAssigneeChange} defaultValue={task.assignee_uid}>
                                                <option value="">(nobody)</option>
                                                {users && users.map((user, index) =>
                                                    <option key={index} value={user.id}>{user.full_name}</option>
                                                )}
                                            </select>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </Tab>
                        <Tab name="Command">
                            <TaskCommandTab task={task} />
                        </Tab>
                    </Tabs>
                </article>
            }
        </div >
    )
}

export default TaskDetails;
