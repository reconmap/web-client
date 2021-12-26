import { Route } from "react-router-dom";
import ClientCreate from "./Create";
import ClientDetails from "./Details";
import EditClientPage from "./Edit";
import ClientsList from "./List";

const ClientsRoutes = [
    <Route path={`/clients/create`} element={<ClientCreate />} />,
    <Route path={`/clients/:clientId`} element={<ClientDetails />} />,
    <Route path={`/clients/:clientId/edit`} element={<EditClientPage />} />,
    <Route path={`/clients`} element={<ClientsList />} />
];

export default ClientsRoutes;
