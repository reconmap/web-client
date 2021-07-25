import ProtectedRoute from "../logic/ProtectedRoute";
import SupportForm from "./Form";
import HelpIndexPage from "./HelpIndex";

const SupportRoutes = [
    <ProtectedRoute exact path={`/help`} component={HelpIndexPage} />,
    <ProtectedRoute exact path={`/support`} component={SupportForm} />
]

export default SupportRoutes;
