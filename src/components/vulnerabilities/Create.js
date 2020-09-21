import React, {useState} from 'react'
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Risks from '../../models/Risks'
import useFetch from '../../hooks/useFetch'
import Loading from '../ui/Loading';
import BtnPrimary from '../ui/buttons/BtnPrimary';
import CancelButton from "../ui/buttons/Cancel";

export default function VulnerabilityCreate({history, location}) {
    const projectId = location.state?.projectId || null
    const [projects] = useFetch('/projects')
    const [vulnerability, setVulnerability] = useState({
        projectId: projectId||null,
        summary: null,
        description: null,
        risk: Risks[0].id,
        cvssScore: null
    })
    const [loading, setLoading] = useState(false)
    const handleCreate = async () => {
        setLoading(true)
        await secureApiFetch(`/vulnerabilities`, {method: 'POST', body: JSON.stringify(vulnerability)})
        history.push(`/vulnerabilities`)
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

    if (!projects) return <Loading/>

    return (
        <div>
            <Breadcrumb goBack={handleGoBack} path={history.location.pathname}/>
            <form onSubmit={e => e.preventDefault()} className='flex flex-col space-y-2'>
                {!projectId && <>
                    <label htmlFor='projectId'>Project</label>
                    <select name="projectId" id="projectId" onChange={handleFormChange}
                            defaultValue={vulnerability.projectId}>
                        {projects.map((project, index) =>
                            <option key={index} value={project.id}>{project.name}</option>
                        )}
                    </select>
                </>}
                <label htmlFor='summary'>Summary</label>
                <input autoFocus type="text" name="summary" onChange={handleFormChange}
                       value={vulnerability.summary || ""}/>
                <label htmlFor='description'>Description</label>
                <input type="text" name="description" onChange={handleFormChange}
                       value={vulnerability.description || ""}/>
                <label htmlFor='risk'>Risk</label>
                <select name="risk" onChange={handleFormChange} defaultValue={vulnerability.risk}>
                    {Risks.map((risk, index) =>
                        <option key={index} value={risk.id}>{risk.name}</option>
                    )}
                </select>
                <label htmlFor='cvssScore'>CVSS score</label>
                <input type="text" name="cvssScore" onChange={handleFormChange} value={vulnerability.cvssScore || ""}/>

                <BtnPrimary onClick={handleCreate} disabled={loading}>{loading ? 'Wait please' : 'Create'}</BtnPrimary>
                <CancelButton onClick={handleGoBack} disabled={loading}/>
            </form>
        </div>
    )
}
