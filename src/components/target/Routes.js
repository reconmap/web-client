import ProtectedRoute from "../logic/ProtectedRoute";
import TargetCreationForm from "./CreationForm";
import MultipleTargetCreationForm from "./MultipleCreationForm";
import TargetView from "./View";

const TargetsRoutes = [
    <ProtectedRoute path={`/targets/add`}
        component={TargetCreationForm} />,
    <ProtectedRoute path={`/targets/add-multiple`}
        component={MultipleTargetCreationForm} />,
    <ProtectedRoute path={`/targets/:targetId([0-9]+)`}
        component={TargetView} />,
]

export default TargetsRoutes;
