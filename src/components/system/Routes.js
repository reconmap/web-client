import SystemIndexPage from ".";
import ProtectedRoute from "../logic/ProtectedRoute";
import ExportPage from "./ExportPage";
import ImportPage from "./ImportPage";
import SystemUsagePage from "./UsagePage";

const SystemRoutes = [
    <ProtectedRoute exact path={`/system`} component={SystemIndexPage} />,
    <ProtectedRoute exact path={`/system/usage`} component={SystemUsagePage} />,
    <ProtectedRoute exact path={`/system/export-data`} component={ExportPage} />,
    <ProtectedRoute exact path={`/system/import-data`} component={ImportPage} />,
]

export default SystemRoutes;
