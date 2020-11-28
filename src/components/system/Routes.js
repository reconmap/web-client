import ProtectedRoute from "../logic/ProtectedRoute";
import SystemIndexPage from "./index";

const SystemRoutes = [
    <ProtectedRoute exact path={`/system-data`} component={SystemIndexPage}/>,
]

export default SystemRoutes
