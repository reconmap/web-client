import { Select } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import Loading from 'components/ui/Loading';
import useFetch from 'hooks/useFetch';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import secureApiFetch from "../../services/api";
import Breadcrumb from '../ui/Breadcrumb';
import PrimaryButton from '../ui/buttons/Primary';
import Title from '../ui/Title';

const SendReport = () => {
    const history = useHistory();
    const routeParams = useParams();
    const { projectId } = routeParams;
    const [project] = useFetch(`/projects/${projectId}`)
    const [revisions] = useFetch(`/reports?projectId=${projectId}`)

    const [deliverySettings, setDeliverySettings] = useState({
        report_id: null,
        recipients: null,
        subject: "[CONFIDENTIAL] Security report attached",
        body: "Please review attachment containing a security report."
    })

    const handleSend = async (ev) => {
        ev.preventDefault();

        secureApiFetch(`/reports/${deliverySettings.report_id}/send`, { method: 'POST', body: JSON.stringify(deliverySettings) })
            .then(() => {
                history.push(`/projects/${project.id}/report`);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setDeliverySettings({ ...deliverySettings, [name]: value });
    };

    useEffect(() => {
        if (revisions && deliverySettings.report_id === null)
            setDeliverySettings({ ...deliverySettings, report_id: revisions[0].id })
    }, [revisions, deliverySettings]);

    if (!project) return <Loading />

    return (
        <div>
            <PageTitle value="Send report" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/projects">Projects</Link>
                    {project && <Link to={`/projects/${project.id}`}>{project.name}</Link>}
                    {project && <Link to={`/projects/${project.id}/report`}>Report</Link>}
                </Breadcrumb>
            </div>
            <form onSubmit={handleSend}>
                <Title title='Send report' />
                <label>Revision
                    {revisions && <Select name="report_id" onChange={handleFormChange}>
                        {revisions.map((revision) => <option value={revision.id}>{revision.version_name}</option>)}
                    </Select>}
                </label>
                <label>Recipients (comma separated)
                    <input type="text" name="recipients" onChange={handleFormChange} required autoFocus
                        placeholder="foo@bar.sec" />
                </label>
                <label>Subject
                    <input type="text" name="subject" onChange={handleFormChange}
                        value={deliverySettings.subject} />
                </label>
                <label>Body
                    <textarea name="body" onChange={handleFormChange} required
                        value={deliverySettings.body} />
                </label>
                <PrimaryButton type="submit">Send</PrimaryButton>
            </form>
        </div>
    )
}

export default SendReport;
