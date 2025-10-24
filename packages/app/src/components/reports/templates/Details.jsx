import { useVulnerabilityQuery } from "api/vulnerabilities.js";
import NativeButtonGroup from "components/form/NativeButtonGroup";
import RestrictedComponent from "components/logic/RestrictedComponent";
import Breadcrumb from "components/ui/Breadcrumb";
import DeleteButton from "components/ui/buttons/Delete";
import LinkButton from "components/ui/buttons/Link";
import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import Title from "components/ui/Title";
import useDelete from "hooks/useDelete";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";

const ReportTemplateDetails = () => {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const { data: vulnerability } = useVulnerabilityQuery(templateId);

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
                    <Title type="Vulnerability template" title={vulnerability.summary} />

                    <Tabs>
                        <TabList>
                            <Tab>Description</Tab>
                            <Tab>Remediation</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel></TabPanel>
                            <TabPanel></TabPanel>
                        </TabPanels>
                    </Tabs>
                </article>
            </div>
        </>
    );
};

export default ReportTemplateDetails;
