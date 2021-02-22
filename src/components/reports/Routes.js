import ProtectedRoute from "../logic/ProtectedRoute";
import SendReport from "./Send";

const ReportsRoutes = [
    <ProtectedRoute path={`/report/:reportId([0-9]+)/send`} component={SendReport} />
];

export default ReportsRoutes
