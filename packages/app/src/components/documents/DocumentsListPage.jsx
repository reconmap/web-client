import { deleteDocument, getDocuments } from "api/documents";
import CreateButton from "components/ui/buttons/Create";
import Title from "components/ui/Title";
import useFetchRequest from "hooks/useFetchRequest";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb.jsx";
import DocumentsTable from "./Table.jsx";

const DocumentsListPage = () => {
    const navigate = useNavigate();
    const { data: documents, refetch } = useFetchRequest(getDocuments());

    const onAddCommandClick = (ev) => {
        ev.preventDefault();

        navigate("/documents/add");
    };

    const onDeleteClick = (documentId) => {
        fetch(deleteDocument(documentId)).then(refetch);
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
                <CreateButton onClick={onAddCommandClick}>Create document</CreateButton>
            </div>
            <Title title="Documents" />
            <DocumentsTable documents={documents} onDeleteButtonClick={onDeleteClick} />
        </div>
    );
};

export default DocumentsListPage;
