import RestrictedComponent from "components/logic/RestrictedComponent";
import ProjectBadge from "components/projects/ProjectBadge";
import DeleteIconButton from "components/ui/buttons/DeleteIconButton";
import ReloadButton from "components/ui/buttons/Reload";
import LoadingTableRow from "components/ui/tables/LoadingTableRow";
import NoResultsTableRow from "components/ui/tables/NoResultsTableRow";
import BadgeOutline from "../badges/BadgeOutline";
import LinkButton from "../ui/buttons/Link";
import UserLink from "../users/Link";
import TaskBadge from "./TaskBadge";
import TaskStatusFormatter from "./TaskStatusFormatter";

const TasksTable = ({ tableModel, tableModelSetter: setTableModel, destroy, reloadCallback = null }) => {
    const showSelection = tableModel.columnsVisibility.selection;
    const showProjectColumn = tableModel.columnsVisibility.project;
    const numColumns = 6 + (showSelection ? 1 : 0) + (showProjectColumn ? 1 : 0);

    const onSelectionChange = (ev) => {
        const target = ev.target;
        const selectionId = parseInt(target.value);
        if (target.checked) {
            setTableModel({
                ...tableModel,
                selection: [...tableModel.selection, selectionId],
            });
        } else {
            setTableModel({
                ...tableModel,
                selection: tableModel.selection.filter((value) => value !== selectionId),
            });
        }
    };

    return (
        <table className="table is-fullwidth">
            <thead>
                <tr>
                    {showSelection && <th style={{ width: "32px" }}>&nbsp;</th>}
                    <th>Summary</th>
                    <th className="only-desktop">Description</th>
                    {showProjectColumn && <th>Project</th>}
                    <th>Priority</th>
                    <th>Assignee</th>
                    <th style={{ width: "100px" }}>Status</th>
                    <th colSpan={reloadCallback ? 1 : 2}>Command</th>
                    {reloadCallback && (
                        <th style={{ width: "15%", textAlign: "right" }}>
                            <ReloadButton onClick={reloadCallback} />
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {null === tableModel.tasks && <LoadingTableRow numColumns={numColumns} />}
                {null !== tableModel.tasks && 0 === tableModel.tasks.length && (
                    <NoResultsTableRow numColumns={numColumns} />
                )}
                {null !== tableModel.tasks &&
                    tableModel.tasks.map((task) => (
                        <tr key={task.id}>
                            {showSelection && (
                                <td>
                                    <input
                                        type="checkbox"
                                        value={task.id}
                                        onChange={onSelectionChange}
                                        checked={tableModel.selection.includes(task.id)}
                                    />
                                </td>
                            )}
                            <td>
                                <TaskBadge task={task} />
                            </td>
                            <td className="only-desktop">
                                {task.description ? task.description.substring(0, 100) + "..." : "-"}
                            </td>
                            {showProjectColumn && (
                                <td>
                                    <ProjectBadge
                                        project={{
                                            id: task.project_id,
                                            name: task.project_name,
                                        }}
                                    />
                                </td>
                            )}
                            <td>{task.priority}</td>
                            <td>
                                {task.assignee_uid ? (
                                    <UserLink userId={task.assignee_uid}>{task.assignee_full_name}</UserLink>
                                ) : (
                                    "(nobody)"
                                )}
                            </td>
                            <td>
                                <TaskStatusFormatter task={task} />
                            </td>
                            <td>{task.command_name ? <BadgeOutline>{task.command_name}</BadgeOutline> : "-"}</td>
                            <td style={{ textAlign: "right" }}>
                                <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                                    <LinkButton href={`/tasks/${task.id}/edit`}>Edit</LinkButton>
                                    {destroy && <DeleteIconButton onClick={() => destroy(task.id)} />}
                                </RestrictedComponent>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
};

export default TasksTable;
