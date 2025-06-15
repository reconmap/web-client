import { Route } from "react-router-dom";
import PasswordGeneratorPage from "./PasswordGeneratorPage.jsx";
import TerminalPage from "./TerminalPage.jsx";
import VaultPage from "./VaultPage.jsx";

const ToolsUrls = {
    Vault: "/tools/vault",
    PasswordGenerator: "/tools/password-generator",
    Terminal: "/tools/terminal",
};

export { ToolsUrls };

const ToolsRoutes = [
    <Route path={ToolsUrls.Vault} element={<VaultPage />} />,
    <Route path={ToolsUrls.PasswordGenerator} element={<PasswordGeneratorPage />} />,
    <Route path={ToolsUrls.Terminal} element={<TerminalPage />} />,
];

export default ToolsRoutes;
