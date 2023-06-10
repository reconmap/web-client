import AuditLogList from "components/auditlog/List";
import { Route } from "react-router-dom";
import SystemIndexPage from ".";
import ExportPage from "./ExportPage";
import SystemHealthPage from "./HealthPage";
import ImportPage from "./ImportPage";
import SystemIntegrationsPage from "./Integrations";
import SystemUsagePage from "./UsagePage";

const SystemRoutes = [
    <Route path="/auditlog" element={<AuditLogList />} />,
    <Route path={`/system`} element={<SystemIndexPage />} />,
    <Route path={`/system/integrations`} element={<SystemIntegrationsPage />} />,
    <Route path={`/system/health`} element={<SystemHealthPage />} />,
    <Route path={`/system/usage`} element={<SystemUsagePage />} />,
    <Route path={`/system/export-data`} element={<ExportPage />} />,
    <Route path={`/system/import-data`} element={<ImportPage />} />,
]

export default SystemRoutes;
