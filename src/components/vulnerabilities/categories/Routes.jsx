import { Route } from "react-router-dom";
import TemplatesList from "./List";

const VulnerabilityCategoriesRoutes = [
    <Route path={`/vulnerabilities/categories`} element={<TemplatesList />} />,
]

export default VulnerabilityCategoriesRoutes;
