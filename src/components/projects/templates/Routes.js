import { Route } from "react-router-dom";
import TemplateDetails from "./Details";
import TemplatesList from "./List";

const ProjectTemplatesRoutes = [
    <Route path={`/projects/templates`} element={<TemplatesList />} />,
    <Route path={`/projects/templates/:templateId`} element={<TemplateDetails />} />
]

export default ProjectTemplatesRoutes;
