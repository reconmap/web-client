import React, { useEffect, useState } from 'react'
import secureApiFetch from '../../services/api'
import PrimaryButton from '../ui/buttons/Primary'
import { IconClipboard, IconUpload } from '../ui/Icons'
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
import ShellCommand from "../ui/ShellCommand";
import TextBlock from "../ui/TextBlock";
import TaskStatusFormatter from "./TaskStatusFormatter";
import TaskStatuses from "../../models/TaskStatuses";
import NoResultsTableRow from '../ui/NoResultsTableRow'
import SecondaryButton from '../ui/buttons/Secondary'

const TaskDetails = ({ history, match }) => {
    const taskId = match.params.taskId;
    const [task, fetchTask] = useFetch(`/tasks/${taskId}`)
    const [users] = useFetch(`/users`)
    const [results, updateCommandOutputs] = useFetch(`/commands/outputs?taskId=${taskId}`)
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
                actionCompletedToast("The task has been assigned.");
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

    const onOutputButtonClick = (ev, outputId) => {
        ev.preventDefault();

        secureApiFetch(`/commands/outputs/${outputId}`, { method: 'DELETE' })
            .then(() => {
                actionCompletedToast("The output has been deleted.");
                updateCommandOutputs();
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
                        <label>Assign to&nbsp;
                        <select onChange={onAssigneeChange} defaultValue={task.assignee_uid}>
                                <option value="">(nobody)</option>
                                {users && users.map((user, index) =>
                                    <option key={index} value={user.id}>{user.full_name}</option>
                                )}
                            </select>
                        </label>
                        <label>Transition to&nbsp;
                        <select onChange={onStatusChange} value={task.status}>
                                {TaskStatuses.map((status, index) =>
                                    <option key={index} value={status.id}>{status.name}</option>
                                )}
                            </select>
                        </label>
                        <PrimaryButton to={`/tasks/${task.id}/upload`}>
                            <IconUpload /> Upload results
                    </PrimaryButton>
                        <DeleteButton onClick={() => handleDelete(task.id)} />
                    </ButtonGroup>
                }
            </div>
            {!task ? <Loading /> :
                <article>
                    <Title title={task.name} type='Task' icon={<IconClipboard />} />
                    <Timestamps insertTs={task.insert_ts} updateTs={task.update_ts} />
                    <h4>Description</h4>
                    <TextBlock value={task.description || "(empty)"} />
                    <h4>Status</h4>
                    <p style={{ display: 'flex', alignItems: 'center', columnGap: 'var(--margin)' }}>
                        <TaskStatusFormatter task={task} />
                    </p>
                    <h4>Command</h4>
                    {task.command &&
                        <>
                            <ShellCommand>{task.command}</ShellCommand>
                            <h5>Results</h5>
                            {!results ? <Loading /> :

                                <table>
                                    <thead>
                                        <th>Upload date</th>
                                        <th>Uploaded by</th>
                                        <th>Filename</th>
                                        <th>File size</th>
                                        <th>Mimetype</th>
                                        <th>&nbsp;</th>
                                    </thead>
                                    <tbody>
                                        {results.length === 0 && <NoResultsTableRow numColumns={5} />}
                                        {results.map((result, index) =>
                                            <tr key={index}>
                                                <td>{result.insert_ts}</td>
                                                <td>{result.submitter_name}</td>
                                                <td>{result.file_name}</td>
                                                <td>{result.file_size}</td>
                                                <td>{result.file_mimetype}</td>
                                                <td style={{ display: "flex" }}>
                                                    <SecondaryButton disabled>Download</SecondaryButton>
                                                    <DeleteButton onClick={ev => onOutputButtonClick(ev, result.id)} />
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            }
                        </>
                    }
                    {!task.command &&
                        <p>No command defined for this task.</p>
                    }
                </article>
            }
        </div>
    )
}

export default TaskDetails;
