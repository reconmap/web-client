import ProtectedRoute from "components/logic/ProtectedRoute";
import TemplatesList from "./List";

const VulnerabilityCategoriesRoutes = [
    <ProtectedRoute exact path={`/vulnerabilities/categories`} component={TemplatesList} />,
]

export default VulnerabilityCategoriesRoutes;
