import ProtectedRoute from "components/logic/ProtectedRoute";
import AddDocumentPage from "./Add";
import DocumentDetailsPage from "./Details";
import EditDocumentPage from "./Edit";
import DocumentsListPage from "./List";

const DocumentsRoutes = [
    <ProtectedRoute exact path={`/documents`} component={DocumentsListPage} />,
    <ProtectedRoute exact path={`/documents/:documentId([0-9]+)`} component={DocumentDetailsPage} />,
    <ProtectedRoute exact path={`/documents/:documentId([0-9]+)/edit`} component={EditDocumentPage} />,
    <ProtectedRoute exact path={`/documents/add`} component={AddDocumentPage} />,
]

export default DocumentsRoutes;
