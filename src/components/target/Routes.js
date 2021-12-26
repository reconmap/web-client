import { Route } from "react-router-dom";
import TargetForm from "./Form";
import MultipleTargetCreationForm from "./MultipleCreationForm";
import TargetView from "./View";

const TargetsRoutes = [
    <Route path={`/projects/:projectId/targets/add`} element={<TargetForm />} />,
    <Route path={`/projects/:projectId/targets/add-multiple`} element={<MultipleTargetCreationForm />} />,
    <Route path={`/targets/:targetId`} element={<TargetView />} />,
]

export default TargetsRoutes;
