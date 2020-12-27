import React, {useEffect, useState} from 'react'
import {Link, useHistory, useParams} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import useFetch from '../../hooks/useFetch'
import Loading from '../ui/Loading';
import Title from '../ui/Title';
import {IconPlus} from '../ui/Icons';
import useSetTitle from "../../hooks/useSetTitle";
import {actionCompletedToast} from "../ui/toast";
import VulnerabilityForm from "./Form";

const VulnerabilityEdit = () => {
    const {vulnerabilityId} = useParams();

    useSetTitle('Edit Vulnerability');

    const history = useHistory();

    const [serverVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const [clientVulnerability, setClientVulnerability] = useState(null);

    const onFormSubmit = async ev => {
        ev.preventDefault();

        await secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, {
            method: 'PUT',
            body: JSON.stringify(clientVulnerability)
        });

        actionCompletedToast(`Vulnerability "${clientVulnerability.summary}" updated.`);

        history.push(`/vulnerabilities/${vulnerabilityId}`)
    };

    useEffect(() => {
        if (serverVulnerability)
            setClientVulnerability(serverVulnerability);
    }, [serverVulnerability]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="Edit Vulnerability" icon={<IconPlus/>}/>
            {!clientVulnerability ? <Loading/> :
                <VulnerabilityForm isEditForm={true} vulnerability={clientVulnerability}
                                   vulnerabilitySetter={setClientVulnerability}
                                   onFormSubmit={onFormSubmit}/>
            }
        </div>
    )
}

export default VulnerabilityEdit;
