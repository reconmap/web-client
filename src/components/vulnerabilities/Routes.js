import ProtectedRoute from "../logic/ProtectedRoute";
import VulnerabilitiesList from "./List";
import VulnerabilityCreate from "./Create";
import VulnerabilityDetails from "./Details";
import VulnerabilityEdit from "./Edit";

const VulnerabilitiesRoutes = [
    <ProtectedRoute exact path={`/vulnerabilities`} component={VulnerabilitiesList}/>,
    <ProtectedRoute exact path={`/vulnerabilities/create`} component={VulnerabilityCreate}/>,
    <ProtectedRoute exact path={`/vulnerabilities/:vulnerabilityId([0-9]+)`} component={VulnerabilityDetails}/>,
    <ProtectedRoute exact path={`/vulnerabilities/:vulnerabilityId([0-9]+)/edit`} component={VulnerabilityEdit}/>
]

export default VulnerabilitiesRoutes
