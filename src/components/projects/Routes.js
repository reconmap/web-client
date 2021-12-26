import SendReport from "components/reports/Send";
import { Route } from "react-router-dom";
import TaskCreationPage from "../tasks/Create";
import ProjectCreateForm from "./Create";
import ProjectDetails from "./Details";
import ProjectEdit from "./Edit";
import ProjectsList from "./List";
import ProjectMembership from "./Membership";
import ProjectReport from "./Report";

const ProjectsRoutes = [
    <Route path={`/projects`} element={<ProjectsList />} />,
    <Route path={`/projects/create`} element={<ProjectCreateForm />} />,
    <Route path={`/projects/:projectId/edit`} element={<ProjectEdit />} />,
    <Route path={`/projects/:projectId/report`} element={<ProjectReport />} />,
    <Route path={`/projects/:projectId/report/send`} element={<SendReport />} />,
    <Route path={`/projects/:projectId/membership`} element={<ProjectMembership />} />,
    <Route path={`/projects/:projectId/tasks/create`} element={<TaskCreationPage />} />,
    <Route path={`/projects/:projectId`} element={<ProjectDetails />} />
]

export default ProjectsRoutes;
