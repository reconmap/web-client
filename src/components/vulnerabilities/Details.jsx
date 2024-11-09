import AttachmentsTable from "components/attachments/AttachmentsTable";
import AttachmentsDropzone from "components/attachments/Dropzone";
import NativeSelect from "components/form/NativeSelect";
import NativeTabs from "components/form/NativeTabs";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Tag from "components/ui/Tag";
import Tags from "components/ui/Tags";
import LinkButton from "components/ui/buttons/Link";
import VulnerabilityStatuses from "models/VulnerabilityStatuses";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import DeleteButton from "../ui/buttons/Delete";
import { actionCompletedToast } from "../ui/toast";
import useDelete from "./../../hooks/useDelete";
import useFetch from "./../../hooks/useFetch";
import VulnerabilitiesNotesTab from "./NotesTab";
import VulnerabilityDescriptionPanel from "./VulnerabilityDescriptionPanel";
import VulnerabilityRemediationPanel from "./VulnerabilityRemediationPanel";

const VulnerabilityDetails = () => {
    const navigate = useNavigate();
    const { vulnerabilityId } = useParams();
    const [vulnerability, updateVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const deleteVulnerability = useDelete(`/vulnerabilities/`);

    const parentType = "vulnerability";
    const parentId = vulnerabilityId;
    const [attachments, reloadAttachments] = useFetch(`/attachments?parentType=${parentType}&parentId=${parentId}`);

    const [tabIndex, tabIndexSetter] = useState(0);

    const handleDelete = async () => {
        const confirmed = await deleteVulnerability(vulnerabilityId);
        if (confirmed) navigate("/vulnerabilities");
    };

    const onStatusChange = (ev) => {
        const [status, substatus] = ev.target.value.split("-");
        secureApiFetch(`/vulnerabilities/${vulnerability.id}`, {
            method: "PATCH",
            body: JSON.stringify({ status, substatus }),
        })
            .then(() => {
                actionCompletedToast("The status has been transitioned.");
                updateVulnerability();
            })
            .catch((err) => console.error(err));
    };

    if (!vulnerability) return <Loading />;

    if (vulnerability && vulnerability.is_template) {
        return <Navigate to={`/vulnerabilities/templates/${vulnerability.id}`} />;
    }

    return (
        <div>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
                <div>
                    <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                        <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>

                        <label>
                            Transition to&nbsp;
                            <NativeSelect
                                onChange={onStatusChange}
                                value={vulnerability.status + "-" + vulnerability.substatus}
                            >
                                {VulnerabilityStatuses.map((status) => (
                                    <option key={`vulnstatus_${status.id}`} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </NativeSelect>
                        </label>

                        <DeleteButton onClick={handleDelete} />
                    </RestrictedComponent>
                </div>
            </div>
            <article>
                <PageTitle value={`${vulnerability.summary} vulnerability`} />
                <Title
                    type="Vulnerability"
                    title={
                        vulnerability.external_id ? (
                            <>
                                <strong>{vulnerability.external_id.toUpperCase()}</strong>
                                &nbsp;{vulnerability.summary}
                            </>
                        ) : (
                            vulnerability.summary
                        )
                    }
                />
                <Tag>{vulnerability.visibility}</Tag> <Tags values={vulnerability.tags} />
                <div>
                    <NativeTabs
                        labels={["Description", "Remediation", "Comments", "Attachments"]}
                        tabIndex={tabIndex}
                        tabIndexSetter={tabIndexSetter}
                    />
                    <div>
                        {0 === tabIndex && (
                            <div>
                                <VulnerabilityDescriptionPanel vulnerability={vulnerability} />
                            </div>
                        )}
                        {1 === tabIndex && (
                            <div>
                                <VulnerabilityRemediationPanel vulnerability={vulnerability} />
                            </div>
                        )}
                        {2 === tabIndex && (
                            <div>
                                <VulnerabilitiesNotesTab vulnerability={vulnerability} />
                            </div>
                        )}
                        {3 === tabIndex && (
                            <div>
                                <AttachmentsDropzone
                                    parentType={parentType}
                                    parentId={parentId}
                                    onUploadFinished={reloadAttachments}
                                />

                                <h4>Attachment list</h4>
                                <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default VulnerabilityDetails;
