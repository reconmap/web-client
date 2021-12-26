import { Route } from "react-router-dom";
import VulnerabilityTemplateDetails from "./Details";
import VulnerabilityTemplatesList from "./List";

const VulnerabilityTemplatesRoutes = [
    <Route path={`/vulnerabilities/templates`} element={<VulnerabilityTemplatesList />} />,
    <Route path={`/vulnerabilities/templates/:templateId`} element={<VulnerabilityTemplateDetails />} />
]

export default VulnerabilityTemplatesRoutes;
