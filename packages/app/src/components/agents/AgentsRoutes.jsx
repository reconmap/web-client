import ProjectsLayout from "components/projects/Layout";
import { Route } from "react-router-dom";
import AgentsListPage from "./AgentsListPage.jsx";

const AgentsUrls = {
    List: "/agents",
};

export { AgentsUrls };

const AgentRoutes = [
    <Route path={AgentsUrls.List} element={<ProjectsLayout />}>
        <Route index element={<AgentsListPage />} />,
    </Route>,
];

export default AgentRoutes;
