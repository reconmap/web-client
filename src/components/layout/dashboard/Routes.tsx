import { Route } from "react-router-dom";
import DashboardPanels from "./DashboardPanels.jsx";


const DashboardUrls = {
    DEFAULT: '/'
}

export { DashboardUrls };

const DashboardRoutes = [
    <Route path={DashboardUrls.DEFAULT} element={<DashboardPanels />} index />,
]

export default DashboardRoutes;
