import { Route } from "react-router-dom";
import SupportForm from "./Form";
import HelpIndexPage from "./HelpIndex";
import LicensesPage from "./Licenses";

const SupportRoutes = [
    <Route path={`/help`} element={<HelpIndexPage />} />,
    <Route path={`/support`} element={<SupportForm />} />,
    <Route path={`/licenses`} element={<LicensesPage />} />
]

export default SupportRoutes;
