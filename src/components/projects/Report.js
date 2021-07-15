import PageTitle from 'components/logic/PageTitle';
import ReportConfigurationForm from 'components/reports/ConfigurationForm';
import ReportRevisions from 'components/reports/Revisions';
import Tab from 'components/ui/Tab';
import Tabs from 'components/ui/Tabs';
import Configuration from 'Configuration';
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import Auth from 'services/auth';
import secureApiFetch from '../../services/api';
import { IconReport } from '../ui/Icons';
import Loading from "../ui/Loading";
import Title from '../ui/Title';
import Breadcrumb from './../ui/Breadcrumb';
import './Report.scss';

const ProjectReport = () => {
    const { params: { id: projectId } } = useRouteMatch();
    const [project, setProject] = useState(null);

    useEffect(() => {
        secureApiFetch(`/projects/${projectId}`, {
            method: 'GET',
        })
            .then(resp => resp.json())
            .then(json => {
                setProject(json);
            });
    }, [projectId, setProject]);

    if (!project) {
        return <Loading />
    }

    return (
        <>
            <PageTitle value={`Report ${project.name}`} />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </Breadcrumb>
            </div>
            <Title type="Project reporting" title="Project report"
                icon={<IconReport />} />

            <Tabs>
                <Tab name="Preview">
                    <ReportPreview projectId={projectId} />
                </Tab>

                <Tab name="Revisions">
                    <ReportRevisions projectId={projectId} />
                </Tab>

                <Tab name="Configuration">
                    <ReportConfigurationForm projectId={projectId} />
                </Tab>
            </Tabs>

        </>
    )
}

export default ProjectReport;

const ReportPreview = ({ projectId }) => {
    const user = Auth.getLoggedInUser();

    return <iframe title="Report preview" style={{ width: '50%', margin: '20px auto' }} id="report" src={Configuration.apiEndpoint + `/reports/preview?projectId=${projectId}&accessToken=${user.access_token}`}></iframe>
}
