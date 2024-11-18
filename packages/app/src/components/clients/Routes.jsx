import SettingsLayout from "components/settings/SettingsLayout";
import { Route } from "react-router-dom";
import ClientCreate from "./Create";
import ClientDetails from "./Details";
import EditClientPage from "./Edit";
import ClientsList from "./List";

const ClientsRoutes = [
    <Route path={`/clients`} element={<SettingsLayout />}>
        <Route index element={<ClientsList />} />
        <Route path={`create`} element={<ClientCreate />} />,
        <Route path={`:clientId`} element={<ClientDetails />} />,
        <Route path={`:clientId/edit`} element={<EditClientPage />} />,
    </Route>,
];

export default ClientsRoutes;