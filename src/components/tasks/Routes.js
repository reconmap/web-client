import ProtectedRoute from "../logic/ProtectedRoute";
import TasksList from "./List";
import TaskDetails from "./Details";
import UploadTaskResult from "./UploadTaskResult";
import TaskCreationPage from "./Create";
import EditTaskPage from "./Edit";

const TasksRoutes = [
    <ProtectedRoute exact path={`/tasks`} component={TasksList}/>,
    <ProtectedRoute exact path={`/tasks/create`} component={TaskCreationPage}/>,
    <ProtectedRoute exact path={`/tasks/:taskId([0-9]+)`} component={TaskDetails}/>,
    <ProtectedRoute exact path={`/tasks/:taskId([0-9]+)/edit`} component={EditTaskPage}/>,
    <ProtectedRoute exact path={`/tasks/:taskId([0-9]+)/upload`} component={UploadTaskResult}/>
]

export default TasksRoutes
