import { Route } from "react-router-dom";
import SettingsIndexPage from ".";
import CustomFieldsPage from "./CustomFields/Form";
import OrganisationForm from "./Organisation/Form";
import SettingsLayout from "./SettingsLayout";

const SettingsRoutes = [
    <Route path="/settings" element={<SettingsLayout />}>
        <Route index element={<SettingsIndexPage />} />,
        <Route path={`organisation`} element={<OrganisationForm />} />,
        <Route path={`custom-fields`} element={<CustomFieldsPage />} />,
    </Route>,
];

export default SettingsRoutes;
