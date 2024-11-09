import { getDocument } from "api/documents";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import PageTitle from "components/logic/PageTitle";
import TimestampsSection from "components/ui/TimestampsSection";
import VisibilityLegend from "components/ui/VisibilityLegend";
import UserLink from "components/users/Link";
import useFetchRequest from "hooks/useFetchRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../ui/Breadcrumb";
import DeleteButton from "../ui/buttons/Delete";
import EditButton from "../ui/buttons/Edit";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import DocumentPreview from "./Preview";

const DocumentDetailsPage = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const { data: serverDoc } = useFetchRequest(getDocument(documentId));

    const handleDelete = async () => {
        fetch(deleteDocument(documentId)).then(() => {
            navigate("/documents");
        });
    };

    if (!serverDoc) {
        return <Loading />;
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/documents">Documents</Link>
                </Breadcrumb>
                <NativeButtonGroup>
                    <EditButton
                        onClick={(ev) => {
                            ev.preventDefault();
                            navigate(`/documents/${serverDoc.id}/edit`);
                        }}
                    >
                        Edit
                    </EditButton>
                    <DeleteButton onClick={handleDelete} />
                </NativeButtonGroup>
            </div>
            <article>
                <div>
                    <PageTitle value={`${serverDoc.title} document`} />
                    <Title type="Document" title={serverDoc.title} />
                </div>

                <div className="grid grid-two">
                    <div>
                        <dl>
                            <dt>Visibility</dt>
                            <dd>
                                <VisibilityLegend visibility={serverDoc.visibility} />
                            </dd>
                        </dl>
                    </div>

                    <div>
                        <h4>Relations</h4>
                        <dl>
                            <dt>Created by</dt>
                            <dd>
                                <UserLink userId={serverDoc.user_id}>{serverDoc.user_name}</UserLink>
                            </dd>
                        </dl>

                        <TimestampsSection entity={serverDoc} />
                    </div>
                </div>
                <DocumentPreview content={serverDoc.content} />
            </article>
        </div>
    );
};

export default DocumentDetailsPage;
