import PageTitle from 'components/logic/PageTitle';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import { IconPlus } from '../ui/Icons';
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import { actionCompletedToast } from "../ui/toast";
import VulnerabilityForm from "./Form";

const VulnerabilityEdit = () => {
    const { vulnerabilityId } = useParams();

    const history = useHistory();

    const [serverVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const [clientVulnerability, setClientVulnerability] = useState(null);

    const onFormSubmit = async ev => {
        ev.preventDefault();

        await secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, {
            method: 'PUT',
            body: JSON.stringify(clientVulnerability)
        });

        actionCompletedToast(`The vulnerability "${clientVulnerability.summary}" has been updated.`);

        if (clientVulnerability.is_template) {
            history.push(`/vulnerabilities/templates/${vulnerabilityId}`);
        } else {
            history.push(`/vulnerabilities/${vulnerabilityId}`)
        }
    };

    useEffect(() => {
        if (serverVulnerability)
            setClientVulnerability(serverVulnerability);
    }, [serverVulnerability]);

    return (
        <div>
            <PageTitle value="Edit Vulnerability" />
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="Vulnerability details" icon={<IconPlus />} />
            {!clientVulnerability ? <Loading /> :
                <VulnerabilityForm isEditForm={true} vulnerability={clientVulnerability}
                    vulnerabilitySetter={setClientVulnerability}
                    onFormSubmit={onFormSubmit} />
            }
        </div>
    )
}

export default VulnerabilityEdit;
