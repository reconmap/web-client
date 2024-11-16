import LibraryLayout from "components/LibraryLayout";
import { Route } from "react-router-dom";
import AddCommandPage from "./Add";
import CommandsListPage from "./CommandsListPage";
import CommandDetails from "./Details";
import EditCommandPage from "./Edit";

const CommandsRoutes = [
    <Route path="/commands" element={<LibraryLayout />}>
        <Route index element={<CommandsListPage />} />,
        <Route path=":commandId" element={<CommandDetails />} />,
        <Route path=":commandId/edit" element={<EditCommandPage />} />,
        <Route path="add" element={<AddCommandPage />} />,
    </Route>,
];

export default CommandsRoutes;
