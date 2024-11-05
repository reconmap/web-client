import { deleteDocument, getDocuments } from "api/documents";
import CreateButton from "components/ui/buttons/Create";
import useDocumentTitle from "hooks/useDocumentTitle";
import useFetchRequest from "hooks/useFetchRequest";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb";
import { IconFolder } from "../ui/Icons";
import Title from "../ui/Title";
import DocumentsTable from "./Table";

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

    useDocumentTitle("Documents");

    return (
        <div>
            <div className="heading">
                <Breadcrumb />
                <CreateButton onClick={onAddCommandClick}>Create document</CreateButton>
            </div>
            <Title title="Documents" icon={<IconFolder />} />
            <DocumentsTable documents={documents} onDeleteButtonClick={onDeleteClick} />
        </div>
    );
};

export default DocumentsListPage;
