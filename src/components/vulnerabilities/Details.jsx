import AttachmentsTable from "components/attachments/AttachmentsTable";
import AttachmentsDropzone from "components/attachments/Dropzone";
import NativeSelect from "components/form/NativeSelect";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Tags from "components/ui/Tags";
import LinkButton from "components/ui/buttons/Link";
import VulnerabilityStatuses from "models/VulnerabilityStatuses";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Breadcrumb from "../ui/Breadcrumb";
import { IconDocument, IconFlag } from "../ui/Icons";
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
                    icon={<IconFlag />}
                />
                <Tag size="sm" colorScheme="blue">
                    {vulnerability.visibility}
                </Tag>{" "}
                <Tags values={vulnerability.tags} />
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Remediation</Tab>
                        <Tab>Comments</Tab>
                        <Tab>Attachments</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <VulnerabilityDescriptionPanel vulnerability={vulnerability} />
                        </TabPanel>
                        <TabPanel>
                            <VulnerabilityRemediationPanel vulnerability={vulnerability} />
                        </TabPanel>
                        <TabPanel>
                            <VulnerabilitiesNotesTab vulnerability={vulnerability} />
                        </TabPanel>
                        <TabPanel>
                            <AttachmentsDropzone
                                parentType={parentType}
                                parentId={parentId}
                                onUploadFinished={reloadAttachments}
                            />

                            <h4>
                                <IconDocument />
                                Attachment list
                            </h4>
                            <AttachmentsTable attachments={attachments} reloadAttachments={reloadAttachments} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </article>
        </div>
    );
};

export default VulnerabilityDetails;
