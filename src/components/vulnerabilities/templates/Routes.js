import ProtectedRoute from "components/logic/ProtectedRoute";
import TemplateDetails from "./Details";
import TemplatesList from "./List";

const VulnerabilityTemplatesRoutes = [
    <ProtectedRoute exact path={`/vulnerabilities/templates`} component={TemplatesList} />,
    <ProtectedRoute exact path={`/vulnerabilities/templates/:templateId([0-9]+)`} component={TemplateDetails} />
]

export default VulnerabilityTemplatesRoutes;
