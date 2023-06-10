import { Route } from "react-router-dom";
import ReportsList from "./List";
import SendReport from "./Send";

const ReportsRoutes = [
    <Route path={`/reports`} element={<ReportsList />} />,
    <Route path={`/report/:reportId/send`} element={<SendReport />} />
];

export default ReportsRoutes;
