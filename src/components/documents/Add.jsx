import { actionCompletedToast } from "components/ui/toast";
import Document from "models/Document";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Title from "../ui/Title";
import DocumentForm from "./Form";

const AddDocumentPage = () => {
    const navigate = useNavigate();
    const [newDocument, setNewDocument] = useState({ ...Document, parent_type: "library" });

    const onFormSubmit = async (ev) => {
        ev.preventDefault();

        secureApiFetch(`/documents`, { method: "POST", body: JSON.stringify(newDocument) }).then(() => {
            navigate(`/documents`);
            actionCompletedToast(`The document "${newDocument.title}" has been added.`);
        });
    };

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/documents">Documents</Link>
                </Breadcrumb>
            </div>

            <Title title="New document details" />

            <DocumentForm onFormSubmit={onFormSubmit} document={newDocument} documentSetter={setNewDocument} />
        </div>
    );
};

export default AddDocumentPage;
