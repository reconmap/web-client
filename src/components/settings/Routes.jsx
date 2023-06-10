import { Route } from "react-router-dom";
import SettingsIndexPage from ".";
import OrganisationForm from "./Organisation/Form";

const SettingsRoutes = [
    <Route path={`/settings`} element={<SettingsIndexPage />} />,
    <Route path={`/settings/organisation`} element={<OrganisationForm />} />
]

export default SettingsRoutes;
