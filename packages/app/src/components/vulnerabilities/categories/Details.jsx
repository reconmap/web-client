import { useDeleteVulnerabilityMutation, useVulnerabilityQuery } from "api/vulnerabilities.js";
import CvssScore from "components/badges/CvssScore";
import RiskBadge from "components/badges/RiskBadge";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Breadcrumb from "components/ui/Breadcrumb";
import DeleteButton from "components/ui/buttons/Delete";
import LinkButton from "components/ui/buttons/Link";
import PrimaryButton from "components/ui/buttons/Primary";
import EmptyField from "components/ui/EmptyField";
import ExternalLink from "components/ui/ExternalLink";
import Loading from "components/ui/Loading";
import TimestampsSection from "components/ui/TimestampsSection";
import Title from "components/ui/Title";
import UserLink from "components/users/Link";
import ReactMarkdown from "react-markdown";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import CvssAbbr from "../CvssAbbr";
import VulnerabilityStatusBadge from "../StatusBadge";

const TemplateDetails = () => {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const { data: vulnerability } = useVulnerabilityQuery(templateId);
    const deleteVulnerabilityMutation = useDeleteVulnerabilityMutation();

    const cloneProject = async (templateId) => {
        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                navigate(`/vulnerabilities/${data.vulnerabilityId}/edit`);
            });
    };

    const onDelete = () => {
        deleteVulnerabilityMutation.mutate(vulnerability.id, {
            onSuccess: () => {
                navigate("/vulnerabilities/templates");
            },
        });
    };

    if (!vulnerability) return <Loading />;

    if (vulnerability && !vulnerability.is_template) {
        return <Navigate to={`/vulnerabilities/${vulnerability.id}`} />;
    }

    return (
        <>
            <div>
                <div className="heading">
                    <Breadcrumb>
                        <Link to="/vulnerabilities">Vulnerabilities</Link>
                        <Link to="/vulnerabilities/templates">Templates</Link>
                    </Breadcrumb>
                    <NativeButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(vulnerability.id)}>Clone and edit</PrimaryButton>

                        <RestrictedComponent roles={["administrator", "superuser", "user"]}>
                            <LinkButton href={`/vulnerabilities/${vulnerability.id}/edit`}>Edit</LinkButton>
                            <DeleteButton onClick={onDelete} />
                        </RestrictedComponent>
                    </NativeButtonGroup>
                </div>
                <article>
                    <Title type="Vulnerability template" title={vulnerability.summary} />

                    <div className="grid grid-two">
                        <div>
                            <h4>Description</h4>
                            {vulnerability.description ? (
                                <ReactMarkdown>{vulnerability.description}</ReactMarkdown>
                            ) : (
                                <EmptyField />
                            )}
                            {vulnerability.solution && (
                                <>
                                    <h4>Solution</h4>
                                    <ReactMarkdown>{vulnerability.solution}</ReactMarkdown>
                                </>
                            )}

                            <h4>Proof of concept</h4>
                            {vulnerability.proof_of_concept ? (
                                <ReactMarkdown>{vulnerability.proof_of_concept}</ReactMarkdown>
                            ) : (
                                <EmptyField />
                            )}

                            <h4>Impact</h4>
                            {vulnerability.impact ? (
                                <ReactMarkdown>{vulnerability.impact}</ReactMarkdown>
                            ) : (
                                <EmptyField />
                            )}

                            <h4>Properties</h4>
                            <dl>
                                <dt>Status</dt>
                                <dd>
                                    <VulnerabilityStatusBadge vulnerability={vulnerability} />
                                </dd>

                                <dt>Risk</dt>
                                <dd>
                                    <RiskBadge risk={vulnerability.risk} />
                                </dd>

                                <dt>Category</dt>
                                <dd>{vulnerability.category_name || "-"}</dd>

                                <dt>
                                    <CvssAbbr /> score
                                </dt>
                                <dd>
                                    <CvssScore score={vulnerability.cvss_score} />
                                </dd>

                                <dt>CVSS vector</dt>
                                <dd>
                                    <ExternalLink
                                        href={`https://www.first.org/cvss/calculator/3.0#${vulnerability.cvss_vector}`}
                                    >
                                        {vulnerability.cvss_vector}
                                    </ExternalLink>
                                </dd>
                            </dl>
                        </div>

                        <div className="content">
                            <h4>Relations</h4>
                            <dl>
                                <dt>Created by</dt>
                                <dd>
                                    <UserLink userId={vulnerability.creator_uid}>
                                        {vulnerability.creator_full_name}
                                    </UserLink>
                                </dd>
                            </dl>

                            <TimestampsSection entity={vulnerability} />
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
};

export default TemplateDetails;
