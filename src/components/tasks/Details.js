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
import FileSizeSpan from '../ui/FileSizeSpan'

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

    const onOutputButtonClick = (ev, outputId) => {
        ev.preventDefault();

        secureApiFetch(`/commands/outputs/${outputId}`, { method: 'DELETE' })
            .then(() => {
                actionCompletedToast("The output has been deleted.");
                updateCommandOutputs();
            })
            .catch(err => console.error(err))
    }

    const [dynamicArgs, setDynamicArgs] = useState('');

    useEffect(() => {
        if (task) {
            document.title = `Task ${task.name} | Reconmap`;

            secureApiFetch(`/projects/${task.project_id}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(project => {
                    setProject(project);
                })
                .catch(err => console.error(err))

            const argRegex = /{{{(.+?)}}}/g;
            const commandArguments = task.command_container_args.match(argRegex);
            const argMap = commandArguments.reduce((accumulator, current) => {
                const tokens = current.replaceAll('{{{', '').replaceAll('}}}', '').split('|||');
                accumulator[tokens[0]] = {
                    name: tokens[0],
                    placeholder: tokens[1]
                };
                return accumulator;
            }, {});

            setContainerArgs(argMap);
        }
    }, [task])

    const onArgUpdate = ev => {
        setContainerArgs({ ...containerArgs, [ev.target.name]: { name: ev.target.name, placeholder: ev.target.value } });
    };

    const [containerArgs, setContainerArgs] = useState(null);

    useEffect(() => {
        if (containerArgs) {
            var aa = '';
            Object.keys(containerArgs).forEach((key) => {
                let a = containerArgs[key];
                aa += `-var ${a.name}=${a.placeholder}`;
            });
            setDynamicArgs(aa);
        }
    }, [containerArgs]);

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
                    <div className="two-columns">
                        <div>
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
                                <dd>{task.creator_full_name}</dd>

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

                    <h4>Command</h4>
                    {task.command_id &&
                        <>
                            <h5>1. Fill in the arguments</h5>
                            {containerArgs !== null &&
                                Object.keys(containerArgs).map((key) =>
                                    <p>
                                        {containerArgs[key].name}<br />
                                        <input name={containerArgs[key].name} value={containerArgs[key].placeholder} onChange={onArgUpdate} />
                                    </p>
                                )
                            }
                            <h5>2. Run this command</h5>
                            <div>
                                To run the task execute:
                                <ShellCommand>./rmap run-command -id {task.command_id} {dynamicArgs}</ShellCommand>
                                <p style={{ fontSize: "small" }}>(this will invoke the <strong>{task.command_short_name}</strong> application on a docker container)</p>
                            </div>
                            <h4>
                                <h5>Results</h5>
                                <PrimaryButton to={`/tasks/${task.id}/upload`}>
                                    <IconUpload /> Upload results
                                </PrimaryButton>
                            </h4>
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
                                                <td><FileSizeSpan fileSize={result.file_size} /></td>
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
                    {!task.command_id &&
                        <p>No command defined for this task.</p>
                    }
                </article>
            }
        </div >
    )
}

export default TaskDetails;
