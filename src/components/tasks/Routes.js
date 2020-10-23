import ProtectedRoute from "../logic/ProtectedRoute";
import TasksList from "./List";
import TaskDetails from "./Details";
import UploadTaskResult from "./UploadTaskResult";

const TasksRoutes = [
    <ProtectedRoute exact path={`/tasks`} component={TasksList}/>,
    <ProtectedRoute exact path={`/tasks/:id([0-9]+)`} component={TaskDetails}/>,
    <ProtectedRoute exact path={`/tasks/:id([0-9]+)/upload`} component={UploadTaskResult}/>
]

export default TasksRoutes
