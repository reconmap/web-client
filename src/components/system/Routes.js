import ProtectedRoute from "../logic/ProtectedRoute";
import ExportPage from "./ExportPage";
import ImportPage from "./ImportPage";

const SystemRoutes = [
    <ProtectedRoute exact path={`/system-data/export`} component={ExportPage}/>,
    <ProtectedRoute exact path={`/system-data/import`} component={ImportPage}/>,
]

export default SystemRoutes
