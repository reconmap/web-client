import { actionCompletedToast } from "components/ui/toast";
import useQuery from "hooks/useQuery";
import Task from "models/Task";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import TaskForm from "./Form";

const TaskCreationPage = () => {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const query = useQuery();
    const defaultProjectId = "";
    const projectIdParam = useRef(query.get("projectId") || defaultProjectId);
    const forTemplate = parseInt(query.get("forTemplate")) === 1;

    const [newTask, setNewTask] = useState({ ...Task, project_id: projectIdParam.current });

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks`, { method: "POST", body: JSON.stringify(newTask) });
        navigate(`/projects/${newTask.project_id}`);
        actionCompletedToast(`The task '${newTask.summary}' has been created.`);
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/tasks">{t("Tasks")}</Link>
                </Breadcrumb>
            </div>

            <Title title="New task details" />

            <TaskForm onFormSubmit={onFormSubmit} task={newTask} forTemplate={forTemplate} taskSetter={setNewTask} />
        </div>
    );
};

export default TaskCreationPage;
