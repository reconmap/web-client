import ProtectedRoute from "components/logic/ProtectedRoute";
import ReportTemplateDetails from "./Details";
import ReportTemplatesList from "./List";

const ReportTemplatesRoutes = [
    <ProtectedRoute exact path={`/reports/templates`} component={ReportTemplatesList} />,
    <ProtectedRoute exact path={`/reports/templates/:templateId([0-9]+)`} component={ReportTemplateDetails} />
]

export default ReportTemplatesRoutes;
