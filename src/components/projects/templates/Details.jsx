import NativeButtonGroup from "components/form/NativeButtonGroup";
import NativeTabs from "components/form/NativeTabs";
import PageTitle from "components/logic/PageTitle";
import Breadcrumb from "components/ui/Breadcrumb";
import DeleteButton from "components/ui/buttons/Delete";
import LinkButton from "components/ui/buttons/Link";
import PrimaryButton from "components/ui/buttons/Primary";
import Loading from "components/ui/Loading";
import Title from "components/ui/Title";
import useDelete from "hooks/useDelete";
import useFetch from "hooks/useFetch";
import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import secureApiFetch from "services/api";
import ProjectDetailsTab from "../DetailsTab";
import ProjectTasks from "../Tasks";

const TemplateDetails = () => {
    const navigate = useNavigate();
    const { templateId } = useParams();
    const [template] = useFetch(`/projects/${templateId}`);

    const [tabIndex, tabIndexSetter] = useState(0);

    const cloneProject = (templateId) => {
        secureApiFetch(`/projects/${templateId}/clone`, { method: "POST" })
            .then((resp) => resp.json())
            .then((data) => {
                navigate(`/projects/${data.projectId}/edit`);
            });
    };

    const destroy = useDelete("/projects/", () => {
        navigate("/projects/templates");
    });

    if (template && !template.is_template) {
        return <Navigate to={`/projects/${template.id}`} />;
    }

    return (
        <>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to="/projects/templates">Templates</Link>
                </Breadcrumb>
                {template && (
                    <NativeButtonGroup>
                        <PrimaryButton onClick={() => cloneProject(template.id)}>
                            Create project from template
                        </PrimaryButton>
                        <LinkButton href={`/projects/${template.id}/edit`}>Edit</LinkButton>
                        <DeleteButton onClick={() => destroy(template.id)} />
                    </NativeButtonGroup>
                )}
            </div>
            {!template ? (
                <Loading />
            ) : (
                <article>
                    <PageTitle value={`${template.name} project template`} />
                    <Title title={template.name} type="Project template" />

                    <div>
                        <NativeTabs labels={["Details", "Tasks"]} tabIndex={tabIndex} tabIndexSetter={tabIndexSetter} />
                        <div>
                            {0 === tabIndex && (
                                <div>
                                    <ProjectDetailsTab project={template} />
                                </div>
                            )}
                            {1 === tabIndex && (
                                <div>
                                    <ProjectTasks project={template} />
                                </div>
                            )}
                        </div>
                    </div>
                </article>
            )}
        </>
    );
};

export default TemplateDetails;
