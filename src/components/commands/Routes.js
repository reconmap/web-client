import ProtectedRoute from "components/logic/ProtectedRoute";
import AddCommandPage from "./Add";
import CommandDetails from "./Details";
import EditCommandPage from "./Edit";
import CommandsListPage from "./List";

const CommandsRoutes = [
    <ProtectedRoute exact path={`/commands`} component={CommandsListPage} />,
    <ProtectedRoute exact path={`/commands/:commandId([0-9]+)`} component={CommandDetails} />,
    <ProtectedRoute exact path={`/commands/:commandId([0-9]+)/edit`} component={EditCommandPage} />,
    <ProtectedRoute exact path={`/commands/add`} component={AddCommandPage} />,
]

export default CommandsRoutes;
