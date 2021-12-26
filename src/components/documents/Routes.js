import { Route } from "react-router-dom";
import AddDocumentPage from "./Add";
import DocumentDetailsPage from "./Details";
import EditDocumentPage from "./Edit";
import DocumentsListPage from "./List";

const DocumentsRoutes = [
    <Route path={`/documents`} element={<DocumentsListPage />} />,
    <Route path={`/documents/:documentId`} element={<DocumentDetailsPage />} />,
    <Route path={`/documents/:documentId/edit`} element={<EditDocumentPage />} />,
    <Route path={`/documents/add`} element={<AddDocumentPage />} />,
]

export default DocumentsRoutes;
