import { Route } from "react-router-dom";
import VulnerabilityCreate from "./Create";
import VulnerabilityDetails from "./Details";
import VulnerabilityEdit from "./Edit";
import VulnerabilitiesList from "./List";

const VulnerabilitiesRoutes = [
    <Route path={`/vulnerabilities`} element={<VulnerabilitiesList />} />,
    <Route path={`/vulnerabilities/create`} element={<VulnerabilityCreate />} />,
    <Route path={`/vulnerabilities/:vulnerabilityId`} element={<VulnerabilityDetails />} />,
    <Route path={`/vulnerabilities/:vulnerabilityId/edit`} element={<VulnerabilityEdit />} />
]

export default VulnerabilitiesRoutes;
