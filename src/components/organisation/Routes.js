import { Route } from "react-router-dom";
import OrganisationForm from "./Form";

const OrganisationRoutes = [
    <Route path={`/organisation`} element={<OrganisationForm />} />
];

export default OrganisationRoutes;
