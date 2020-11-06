import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Risks from '../../models/Risks'
import useFetch from '../../hooks/useFetch'
import Loading from '../ui/Loading';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import CancelButton from "../ui/buttons/Cancel";
import Title from '../ui/Title';
import {IconPlus} from '../ui/Icons';
import useSetTitle from "../../hooks/useSetTitle";

export default function VulnerabilityCreate({history, location}) {

    useSetTitle('Create Vulnerability');

    const projectId = new URLSearchParams(location.search).get('projectId') || null
    const [projects] = useFetch('/projects')
    const [vulnerability, setVulnerability] = useState({
        projectId: projectId || null,
        summary: null,
        description: null,
        risk: Risks[0].id,
        cvssScore: null,
        cvssVector: null,
    })
    const [loading, setLoading] = useState(false)
    const handleCreate = (event) => {
        event.preventDefault();

        setLoading(true)
        secureApiFetch(`/vulnerabilities`, {method: 'POST', body: JSON.stringify(vulnerability)})
            .then(r => history.push(`/vulnerabilities`));
    }
    const handleFormChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setVulnerability({...vulnerability, [name]: value});
    };
    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <Title title="Create Vulnerability" icon={<IconPlus/>}/>

            {!projects ? <Loading/> :
                <form onSubmit={handleCreate}>
                    {!projectId &&
                    <label>
                        <span>Project</span>
                        <select name="projectId" id="projectId" onChange={handleFormChange}
                                defaultValue={vulnerability.projectId}>
                            {projects.map((project, index) =>
                                <option key={index} value={project.id}>{project.name}</option>
                            )}
                        </select>
                    </label>}
                    <label>
                        Summary
                        <input type="text" name="summary" onChange={handleFormChange}
                               value={vulnerability.summary || ""} required autoFocus/>
                    </label>
                    <label>Description
                        <input type="text" name="description" onChange={handleFormChange}
                               value={vulnerability.description || ""} required/>
                    </label>
                    <label>Risk
                        <select name="risk" onChange={handleFormChange} defaultValue={vulnerability.risk}>
                            {Risks.map((risk, index) =>
                                <option key={index} value={risk.id}>{risk.name}</option>
                            )}
                        </select>
                    </label>
                    <label>CVSS score
                        <input type="number" step="0.1" min="0" max="10" name="cvssScore"
                               onChange={handleFormChange}
                               value={vulnerability.cvssScore || ""}/>
                    </label>
                    <label><span>CVSS vector<br/><small>eg: AV:N/AC:L/Au:S/C:P/I:P/A:N</small></span>
                        <input type="text" name="cvssVector" onChange={handleFormChange}
                               value={vulnerability.cvssVector || ""}/>
                    </label>

                    <BtnPrimary type="submit"
                                disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                    <CancelButton onClick={handleGoBack} disabled={loading}/>
                </form>
            }
        </div>
    )
}
