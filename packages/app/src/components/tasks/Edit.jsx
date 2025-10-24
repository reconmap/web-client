import { useTaskQuery } from "api/tasks.js";
import { actionCompletedToast } from "components/ui/toast";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import TaskForm from "./TaskForm";

const EditTaskPage = () => {
    const navigate = useNavigate();
    const { taskId } = useParams();

    const { data: serverTask } = useTaskQuery(taskId);
    const [clientTask, setClientTask] = useState(null);

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        await secureApiFetch(`/tasks/${taskId}`, { method: "PATCH", body: JSON.stringify(clientTask) });
        actionCompletedToast(`The task "${clientTask.summary}" has been updated.`);
        navigate(`/tasks/${taskId}`);
    };

    useEffect(() => {
        if (serverTask) setClientTask(serverTask);
    }, [serverTask]);

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/tasks">{t("Tasks")}</Link>
                </Breadcrumb>
            </div>

            <Title title="Task details" />

            {!clientTask ? (
                <Loading />
            ) : (
                <TaskForm
                    isEditForm={true}
                    forTemplate={clientTask.project_is_template === 1}
                    onFormSubmit={onFormSubmit}
                    task={clientTask}
                    taskSetter={setClientTask}
                />
            )}
        </div>
    );
};

export default EditTaskPage;
