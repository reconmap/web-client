import { Route } from "react-router-dom";
import PasswordGeneratorPage from "./PasswordGeneratorPage.jsx";
import TerminalPage from "./TerminalPage.jsx";

const ToolsUrls = {
    Terminal: "/tools/terminal",
    PasswordGenerator: "/tools/password-generator",
};

export { ToolsUrls };

const ToolsRoutes = [
    <Route path={ToolsUrls.Terminal} element={<TerminalPage />} />,
    <Route path={ToolsUrls.PasswordGenerator} element={<PasswordGeneratorPage />} />,
];

export default ToolsRoutes;
