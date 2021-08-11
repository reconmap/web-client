import ProtectedRoute from "../logic/ProtectedRoute";
import TargetForm from "./Form";
import MultipleTargetCreationForm from "./MultipleCreationForm";
import TargetView from "./View";

const TargetsRoutes = [
    <ProtectedRoute path={`/projects/:projectId/targets/add`}
        component={TargetForm} />,
    <ProtectedRoute path={`/projects/:projectId/targets/add-multiple`}
        component={MultipleTargetCreationForm} />,
    <ProtectedRoute path={`/targets/:targetId([0-9]+)`}
        component={TargetView} />,
]

export default TargetsRoutes;
