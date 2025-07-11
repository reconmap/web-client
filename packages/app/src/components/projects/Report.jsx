import NativeTabs from "components/form/NativeTabs";
import ReportRevisions from "components/reports/Revisions";
import Configuration from "Configuration";
import { AuthContext } from "contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import secureApiFetch from "../../services/api";
import Loading from "../ui/Loading";
import Title from "../ui/Title";
import Breadcrumb from "./../ui/Breadcrumb";
import "./Report.css";

const ProjectReport = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    const [tabIndex, tabIndexSetter] = useState(0);

    useEffect(() => {
        secureApiFetch(`/projects/${projectId}`, {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then((json) => {
                setProject(json);
            });
    }, [projectId, setProject]);

    if (!project) {
        return <Loading />;
    }

    return (
        <>
            <div className="heading">
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </Breadcrumb>
            </div>
            <Title type="Report" title={project.name} />

            <NativeTabs labels={["Preview", "Revisions"]} tabIndex={tabIndex} tabIndexSetter={tabIndexSetter} />

            {0 === tabIndex && <ReportPreview projectId={projectId} />}
            {1 === tabIndex && <ReportRevisions projectId={projectId} />}
        </>
    );
};

export default ProjectReport;

const ReportPreview = ({ projectId }) => {
    const { user } = useContext(AuthContext);

    return (
        <iframe
            title="Report preview"
            style={{ width: "50%", margin: "20px auto" }}
            id="report"
            src={
                Configuration.getDefaultApiUrl() +
                `/reports/preview?projectId=${projectId}&accessToken=${user.access_token}`
            }
        ></iframe>
    );
};
