import { actionCompletedToast } from "components/ui/toast";
import { errorToast } from "components/ui/toast.jsx";
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

        secureApiFetch(`/documents`, { method: "POST", body: JSON.stringify(newDocument) })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Failed to create document");
                }
                return resp.json();
            })
            .then(() => {
                navigate(`/documents`);
                actionCompletedToast(`The document "${newDocument.title}" has been added.`);
            })
            .catch((error) => {
                console.error("Error creating document:", error);
                errorToast(`Failed to add the document "${newDocument.title}".`);
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
