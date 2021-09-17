import ProtectedRoute from "../logic/ProtectedRoute";
import ReportsList from "./List";
import SendReport from "./Send";

const ReportsRoutes = [
    <ProtectedRoute exact path={`/reports`} component={ReportsList} />,
    <ProtectedRoute path={`/report/:reportId([0-9]+)/send`} component={SendReport} />
];

export default ReportsRoutes
