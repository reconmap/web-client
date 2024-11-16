import ProjectsLayout from "components/projects/Layout";
import { Route } from "react-router-dom";
import TaskCreationPage from "./Create";
import TaskDetails from "./Details";
import EditTaskPage from "./Edit";
import TasksListPage from "./TasksListPage";

const TasksRoutes = [
    <Route path="/tasks" element={<ProjectsLayout />}>
        <Route index element={<TasksListPage />} />,
        <Route path={`create`} element={<TaskCreationPage />} />,
        <Route path={`:taskId`} element={<TaskDetails />} />,
        <Route path={`:taskId/edit`} element={<EditTaskPage />} />,
    </Route>,
];

export default TasksRoutes;
