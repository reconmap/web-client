import ProtectedRoute from "../logic/ProtectedRoute";
import ClientCreate from "./Create";
import ClientDetails from "./Details";
import ClientsList from "./List";
import EditClientPage from "./Edit";

const ClientsRoutes = [
    <ProtectedRoute exact path={`/clients/create`} component={ClientCreate}/>,
    <ProtectedRoute exact path={`/clients/:clientId([0-9]+)`} component={ClientDetails}/>,
    <ProtectedRoute exact path={`/clients/:clientId([0-9]+)/edit`} component={EditClientPage}/>,
    <ProtectedRoute exact path={`/clients`} component={ClientsList}/>
];

export default ClientsRoutes
