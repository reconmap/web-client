import SendReport from "components/reports/Send";
import ProtectedRoute from "../logic/ProtectedRoute";
import TargetCreateForm from "../target/Create";
import TargetView from "../target/View";
import TaskCreationPage from "../tasks/Create";
import ProjectCreateForm from "./Create";
import ProjectDetails from "./Details";
import ProjectEdit from "./Edit";
import ProjectsList from "./List";
import ProjectMembership from "./Membership";
import ProjectReport from "./Report";

const ProjectsRoutes = [
    <ProtectedRoute exact path={`/projects`} component={ProjectsList} />,
    <ProtectedRoute exact path={`/projects/create`} component={ProjectCreateForm} />,
    <ProtectedRoute path={`/projects/:projectId([0-9]+)/edit`} component={ProjectEdit} />,
    <ProtectedRoute exact path={`/projects/:id([0-9]+)/report`} component={ProjectReport} />,
    <ProtectedRoute path={`/projects/:projectId([0-9]+)/report/send`} component={SendReport} />,
    <ProtectedRoute path={`/projects/:id([0-9]+)/membership`}
        component={ProjectMembership} />,
    <ProtectedRoute path={`/projects/:id([0-9]+)/tasks/create`}
        component={TaskCreationPage} />,
    <ProtectedRoute path={`/projects/:id([0-9]+)/targets/create`}
        component={TargetCreateForm} />,
    <ProtectedRoute path={`/projects/:projectId([0-9]+)/targets/:targetId([0-9]+)`}
        component={TargetView} />,
    <ProtectedRoute exact path={`/projects/:id([0-9]+)`} component={ProjectDetails} />
]

export default ProjectsRoutes;
