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
    const [projects] = useFetch('/projects');
    const [categories] = useFetch('/vulnerabilities/categories');
    const [serverVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const [clientVulnerability, setClientVulnerability] = useState(null);

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setClientVulnerability({...clientVulnerability, [name]: value});
    };

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
            {!clientVulnerability || !projects || !categories ? <Loading/> :
                <VulnerabilityForm vulnerability={clientVulnerability} projects={projects} categories={categories}
                                   onFormSubmit={onFormSubmit} onFormChange={handleFormChange}/>
            }
        </div>
    )
}

export default VulnerabilityEdit;
