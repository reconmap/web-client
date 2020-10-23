import ProtectedRoute from "../logic/ProtectedRoute";
import VulnerabilitiesList from "./List";
import VulnerabilityCreate from "./Create";
import VulnerabilityDetails from "./Details";

const VulnerabilitiesRoutes = [
    <ProtectedRoute exact path={`/vulnerabilities`} component={VulnerabilitiesList}/>,
    <ProtectedRoute exact path={`/vulnerabilities/create`} component={VulnerabilityCreate}/>,
    <ProtectedRoute path={`/vulnerabilities/:id([0-9]+)`} component={VulnerabilityDetails}/>
]

export default VulnerabilitiesRoutes
