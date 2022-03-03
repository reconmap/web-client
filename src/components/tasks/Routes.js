import { Route } from "react-router-dom";
import TaskCreationPage from "./Create";
import TaskDetails from "./Details";
import EditTaskPage from "./Edit";
import TasksList from "./List";

const TasksRoutes = [
    <Route path={`/tasks`} element={<TasksList />} />,
    <Route path={`/tasks/create`} element={<TaskCreationPage />} />,
    <Route path={`/tasks/:taskId`} element={<TaskDetails />} />,
    <Route path={`/tasks/:taskId/edit`} element={<EditTaskPage />} />,
]

export default TasksRoutes
