import { Route } from "react-router-dom";
import AddCommandPage from "./Add";
import CommandDetails from "./Details";
import EditCommandPage from "./Edit";
import CommandsListPage from "./List";

const CommandsRoutes = [
    <Route path="/commands" element={<CommandsListPage />} />,
    <Route path="/commands/:commandId" element={<CommandDetails />} />,
    <Route path="/commands/:commandId/edit" element={<EditCommandPage />} />,
    <Route path="/commands/add" element={<AddCommandPage />} />,
]

export default CommandsRoutes;
