import { Route } from "react-router-dom";
import ReportTemplateDetails from "./Details";
import ReportTemplatesList from "./List";

const ReportTemplatesRoutes = [
    <Route path={`/reports/templates`} element={<ReportTemplatesList />} />,
    <Route path={`/reports/templates/:templateId`} element={<ReportTemplateDetails />} />
]

export default ReportTemplatesRoutes;
