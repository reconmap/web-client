import ProtectedRoute from "components/logic/ProtectedRoute";
import VulnerabilityTemplateDetails from "./Details";
import VulnerabilityTemplatesList from "./List";

const VulnerabilityTemplatesRoutes = [
    <ProtectedRoute exact path={`/vulnerabilities/templates`} component={VulnerabilityTemplatesList} />,
    <ProtectedRoute exact path={`/vulnerabilities/templates/:templateId([0-9]+)`} component={VulnerabilityTemplateDetails} />
]

export default VulnerabilityTemplatesRoutes;
