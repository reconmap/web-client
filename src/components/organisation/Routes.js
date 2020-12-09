import ProtectedRoute from "../logic/ProtectedRoute";
import OrganisationForm from "./Form";

const OrganisationRoutes = [
    <ProtectedRoute exact path={`/organisation`} component={OrganisationForm}/>
];

export default OrganisationRoutes;
