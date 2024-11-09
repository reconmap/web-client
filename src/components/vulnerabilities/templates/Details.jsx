import NativeButtonGroup from "components/form/NativeButtonGroup";
import NativeTabs from "components/form/NativeTabs";
import PageTitle from "components/logic/PageTitle";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Breadcrumb from "components/ui/Breadcrumb";
import DeleteButton from "components/ui/buttons/Delete";
import LinkButton from "components/ui/buttons/Link";
import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import Title from "components/ui/Title";
import useDelete from "hooks/useDelete";
import useFetch from "hooks/useFetch";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import VulnerabilityDescriptionPanel from "../VulnerabilityDescriptionPanel";
import VulnerabilityRemediationPanel from "../VulnerabilityRemediationPanel";

const VulnerabilityTemplateDetails = () => {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const [vulnerability] = useFetch(`/vulnerabilities/${templateId}`);

    const cloneProject = async (templateId) => {
        secureApiFetch(`/vulnerabilities/${templateId}/clone`, { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                navigate(`/vulnerabilities/${data.vulnerabilityId}/edit`);
            });
    };

    const destroy = useDelete("/vulnerabilities/", () => {
        navigate("/vulnerabilities/templates");
    });

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
                            <DeleteButton onClick={() => destroy(vulnerability.id)} />
                        </RestrictedComponent>
                    </NativeButtonGroup>
                </div>
                <article>
                    <PageTitle value={`${vulnerability.summary} vulnerability template`} />

                    <Title type="Vulnerability template" title={vulnerability.summary} />

                    <div>
                        <NativeTabs labels={["Description", "Remediation"]} />
                        <div>
                            <div>
                                <VulnerabilityDescriptionPanel vulnerability={vulnerability} />
                            </div>
                            <div>
                                <VulnerabilityRemediationPanel vulnerability={vulnerability} />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
};

export default VulnerabilityTemplateDetails;
