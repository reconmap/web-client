import AttachmentsTable from "components/attachments/AttachmentsTable";
import AttachmentsDropzone from "components/attachments/Dropzone";
import CommandBadge from "components/commands/Badge";
import CommandInstructions from "components/commands/Instructions";
import NativeButton from "components/form/NativeButton";
import NativeSelect from "components/form/NativeSelect";
import NativeTabs from "components/form/NativeTabs";
import RestrictedComponent from "components/logic/RestrictedComponent";
import EmptyField from "components/ui/EmptyField";
import RelativeDateFormatter from "components/ui/RelativeDateFormatter";
import TimestampsSection from "components/ui/TimestampsSection";
import Title from "components/ui/Title";
import LinkButton from "components/ui/buttons/Link";
import { actionCompletedToast } from "components/ui/toast";
import UserLink from "components/users/Link";
import { useAuth } from "contexts/AuthContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import useDelete from "../../hooks/useDelete.js";
import useFetch from "../../hooks/useFetch.js";
import TaskStatuses from "../../models/TaskStatuses.js";
import secureApiFetch from "../../services/api.js";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import Loading from "../ui/Loading.jsx";
import DeleteButton from "../ui/buttons/Delete.jsx";
import TaskStatusFormatter from "./TaskStatusFormatter.jsx";

const TaskDetailsPage = () => {
    const [t] = useTranslation();
    const { user: loggedInUser } = useAuth();
    const navigate = useNavigate();
    const { taskId } = useParams();
    const [task, fetchTask] = useFetch(`/tasks/${taskId}`);
    const [users] = useFetch(`/users`);
    const [project, setProject] = useState(null);
    const [command, setCommand] = useState(null);

    const [tabIndex, tabIndexSetter] = useState(0);

    const parentType = "task";
    const parentId = taskId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`);

    const destroy = useDelete("/tasks/", fetchTask);

    const handleDelete = () => {
        destroy(task.id);
        navigate("/tasks");
    };

    const onAssigneeChange = (ev) => {
        const assigneeUid = ev.target.value;
        secureApiFetch(`/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                assignee_uid: "" === assigneeUid ? null : assigneeUid,
            }),
        })
            .then(() => {
                actionCompletedToast("The assignee has been updated.");
                fetchTask();
            })
            .catch((err) => console.error(err));
    };

    const cloneTask = () => {
        secureApiFetch(`/tasks/${task.id}/clone`, { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                navigate(`/tasks/${data.taskId}/edit`);
            });
    };

    const onStatusChange = (ev) => {
        const status = ev.target.value;
        secureApiFetch(`/tasks/${task.id}`, {
            method: "PATCH",
            body: JSON.stringify({ status: status }),
        })
            .then(() => {
                actionCompletedToast("The status has been transitioned.");
                fetchTask();
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (task) {
            if (task.command_id) {
                secureApiFetch(`/commands/${task.command_id}`, {
                    method: "GET",
                })
                    .then((resp) => resp.json())
                    .then((command) => setCommand(command))
                    .catch((err) => console.error(err));
            }

            secureApiFetch(`/projects/${task.project_id}`, { method: "GET" })
                .then((resp) => resp.json())
                .then((project) => setProject(project))
                .catch((err) => console.error(err));
        }
    }, [task]);

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/tasks">{t("Tasks")}</Link>
                    {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
                    {task && <>{task.summary}</>}
                </Breadcrumb>

                {task && users && (
                    <div>
                        <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                            <LinkButton href={`/tasks/${task.id}/edit`}>Edit</LinkButton>
                            <NativeButton onClick={cloneTask}>Clone and edit</NativeButton>
                            {1 !== task.project_is_template && (
                                <label>
                                    <NativeSelect onChange={onStatusChange} value={task.status}>
                                        {TaskStatuses.map((status, index) => (
                                            <option key={index} value={status.id}>
                                                {t("Status")} &rarr; {status.name}
                                            </option>
                                        ))}
                                    </NativeSelect>
                                </label>
                            )}
                            <DeleteButton onClick={() => handleDelete(task.id)} />
                        </RestrictedComponent>
                    </div>
                )}
            </div>
            {!task ? (
                <Loading />
            ) : (
                <article>
                    <Title type="Task" title={task.summary} />

                    <div>
                        <NativeTabs
                            labels={[
                                t("Details"),
                                null !== command ? t("Command instructions") : null,
                                t("Attachments"),
                            ]}
                            tabIndex={tabIndex}
                            tabIndexSetter={tabIndexSetter}
                        />
                        <div>
                            {0 === tabIndex && (
                                <div>
                                    <div className="grid grid-two">
                                        <div>
                                            <h4>{t("Description")}</h4>
                                            {task.description ? (
                                                <ReactMarkdown>{task.description}</ReactMarkdown>
                                            ) : (
                                                <EmptyField />
                                            )}
                                            <h4>{t("Priority")}</h4>
                                            <p>{task.priority}</p>
                                            <h4>{t("Status")}</h4>
                                            <p
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    columnGap: "var(--margin)",
                                                }}
                                            >
                                                <TaskStatusFormatter task={task} />
                                            </p>
                                            {task.command_id && (
                                                <>
                                                    <h4>Command</h4>
                                                    <CommandBadge
                                                        command={{
                                                            id: task.command_id,
                                                            name: task.command_name,
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </div>

                                        <div>
                                            <h4>People</h4>
                                            <dl>
                                                <dt>{t("Created by")}</dt>
                                                <dd>
                                                    <UserLink userId={task.creator_uid}>
                                                        {task.creator_full_name}
                                                    </UserLink>
                                                </dd>

                                                {1 !== task.project_is_template && (
                                                    <>
                                                        <dt>Assigned to</dt>
                                                        <dd>
                                                            {users && (
                                                                <NativeSelect
                                                                    onChange={onAssigneeChange}
                                                                    defaultValue={task.assignee_uid}
                                                                >
                                                                    <option value="">(nobody)</option>
                                                                    {users.map((user, index) => (
                                                                        <option key={index} value={user.id}>
                                                                            {user.full_name}
                                                                            {user.id === loggedInUser.id
                                                                                ? " (You)"
                                                                                : ""}
                                                                        </option>
                                                                    ))}
                                                                </NativeSelect>
                                                            )}
                                                        </dd>
                                                    </>
                                                )}
                                            </dl>

                                            <TimestampsSection entity={task} />
                                            {task.due_date && (
                                                <dl>
                                                    <dt>Due date</dt>
                                                    <dd>
                                                        <RelativeDateFormatter date={task.due_date} />
                                                    </dd>
                                                </dl>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {null !== command && 1 === tabIndex && (
                                <div>
                                    <CommandInstructions command={command} task={task} />
                                </div>
                            )}
                            {(null !== command ? 2 : 1) === tabIndex && (
                                <div>
                                    <AttachmentsDropzone
                                        parentType={parentType}
                                        parentId={parentId}
                                        onUploadFinished={reloadAttachments}
                                    />

                                    <h4>Attachment list</h4>
                                    <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            )}
        </div>
    );
};

export default TaskDetailsPage;
