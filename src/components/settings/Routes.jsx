import { Route } from "react-router-dom";
import SettingsIndexPage from ".";
import CustomFieldsPage from "./CustomFields/Form";
import OrganisationForm from "./Organisation/Form";

const SettingsRoutes = [
    <Route path={`/settings`} element={<SettingsIndexPage />} />,
    <Route path={`/settings/organisation`} element={<OrganisationForm />} />,
    <Route path={`/settings/custom-fields`} element={<CustomFieldsPage />} />,
];

export default SettingsRoutes;
