import ProtectedRoute from "components/logic/ProtectedRoute";
import TemplateDetails from "./Details";
import TemplatesList from "./List";

const ProjectTemplatesRoutes = [
    <ProtectedRoute exact path={`/projects/templates`} component={TemplatesList} />,
    <ProtectedRoute exact path={`/projects/templates/:templateId([0-9]+)`} component={TemplateDetails} />
]

export default ProjectTemplatesRoutes;
