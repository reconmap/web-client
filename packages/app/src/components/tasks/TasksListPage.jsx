import NativeSelect from "components/form/NativeSelect";
import RestrictedComponent from "components/logic/RestrictedComponent";
import DeleteButton from "components/ui/buttons/Delete";
import Title from "components/ui/Title";
import { actionCompletedToast } from "components/ui/toast";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import secureApiFetch from "services/api";
import TaskStatuses from "../../models/TaskStatuses.js";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import CreateButton from "../ui/buttons/Create.jsx";
import TaskFilters from "./Filters.jsx";
import TasksTable from "./TasksTable.jsx";
import TaskTableModel from "./TaskTableModel";

const TasksListPage = () => {
    const [t] = useTranslation();

    const navigate = useNavigate();

    const [tableModel, setTableModel] = useState(new TaskTableModel(true, true));

    const handleCreateTask = () => {
        navigate(`/tasks/create`);
    };

    const reloadTasks = useCallback(() => {
        setTableModel((tableModel) => ({ ...tableModel, tasks: null }));

        const queryParams = new URLSearchParams();
        queryParams.set("orderColumn", tableModel.sortBy.column);
        queryParams.set("orderDirection", tableModel.sortBy.order);
        Object.keys(tableModel.filters).forEach(
            (key) =>
                tableModel.filters[key] !== null &&
                tableModel.filters[key].length !== 0 &&
                queryParams.append(key, tableModel.filters[key]),
        );
        const url = `/tasks?${queryParams.toString()}`;

        secureApiFetch(url, { method: "GET" })
            .then((resp) => {
                return resp.json();
            })
            .then((data) => {
                setTableModel((tableModel) => ({ ...tableModel, tasks: data }));
            });
    }, [setTableModel, tableModel.filters, tableModel.sortBy.column, tableModel.sortBy.order]);

    const onStatusSelectChange = (ev) => {
        const newStatus = ev.target.value;

        secureApiFetch("/tasks", {
            method: "PATCH",
            headers: {
                "Bulk-Operation": "UPDATE",
            },
            body: JSON.stringify({
                taskIds: tableModel.selection,
                newStatus: newStatus,
            }),
        })
            .then(reloadTasks)
            .then(() => {
                actionCompletedToast(`All selected tasks have been transitioned to "${newStatus}".`);
                ev.target.value = "";
            })
            .catch((err) => console.error(err));
    };

    const onDeleteButtonClick = () => {
        secureApiFetch("/tasks", {
            method: "PATCH",
            headers: {
                "Bulk-Operation": "DELETE",
            },
            body: JSON.stringify(tableModel.selection),
        })
            .then(reloadTasks)
            .then(() => {
                setTableModel({ ...tableModel, selection: [] });
                actionCompletedToast("All selected tasks were deleted.");
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        reloadTasks();
    }, [reloadTasks, tableModel.filters]);

    return (
        <>
            <div className="heading">
                <Breadcrumb />
                <div className="field is-grouped">
                    <CreateButton onClick={handleCreateTask}>Create task</CreateButton>
                    <div className="control">
                        <NativeSelect disabled={!tableModel.selection.length} onChange={onStatusSelectChange}>
                            <option value="">(bulk status change)</option>
                            {TaskStatuses.map((status, index) => (
                                <option key={index} value={status.id}>
                                    {t("Status")} &rarr; {status.name}
                                </option>
                            ))}
                        </NativeSelect>
                    </div>
                    <RestrictedComponent roles={["administrator"]}>
                        <DeleteButton onClick={onDeleteButtonClick} disabled={!tableModel.selection.length}>
                            Delete selected
                        </DeleteButton>
                    </RestrictedComponent>
                </div>
            </div>
            <Title title={t("Tasks")} />

            <div>
                <TaskFilters tableModel={tableModel} tableModelSetter={setTableModel} />
            </div>

            <TasksTable tableModel={tableModel} tableModelSetter={setTableModel} reloadCallback={reloadTasks} />
        </>
    );
};

export default TasksListPage;
