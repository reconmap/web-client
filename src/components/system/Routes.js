import SystemIndexPage from ".";
import ProtectedRoute from "../logic/ProtectedRoute";
import ExportPage from "./ExportPage";
import SystemHealthPage from "./HealthPage";
import ImportPage from "./ImportPage";
import SystemIntegrationsPage from "./Integrations";
import SystemLogsPage from "./LogsPage";
import SystemUsagePage from "./UsagePage";

const SystemRoutes = [
    <ProtectedRoute exact path={`/system`} component={SystemIndexPage} />,
    <ProtectedRoute exact path={`/system/integrations`} component={SystemIntegrationsPage} />,
    <ProtectedRoute exact path={`/system/health`} component={SystemHealthPage} />,
    <ProtectedRoute exact path={`/system/usage`} component={SystemUsagePage} />,
    <ProtectedRoute exact path={`/system/logs`} component={SystemLogsPage} />,
    <ProtectedRoute exact path={`/system/export-data`} component={ExportPage} />,
    <ProtectedRoute exact path={`/system/import-data`} component={ImportPage} />,
]

export default SystemRoutes;
