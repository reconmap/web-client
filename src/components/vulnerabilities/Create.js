import React, {useEffect, useRef, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom';
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

const VulnerabilityCreate = () => {

    useSetTitle('Create Vulnerability');

    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlProjectId = useRef(searchParams.get('projectId') || "");
    const [projects] = useFetch('/projects');
    const [categories] = useFetch('/vulnerabilities/categories');
    const [vulnerability, setVulnerability] = useState({
        projectId: urlProjectId.current,
        summary: "",
        description: "",
        risk: Risks[0].id,
        categoryId: null,
        cvssScore: null,
        cvssVector: null,
    })
    const [loading, setLoading] = useState(false)

    const handleGoBack = () => {
        history.push(`/vulnerabilities`);
    };

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setVulnerability({...vulnerability, [name]: value});
    };

    const handleCreate = ev => {
        ev.preventDefault();

        setLoading(true)
        secureApiFetch(`/vulnerabilities`, {method: 'POST', body: JSON.stringify(vulnerability)})
            .then(r => history.push(`/vulnerabilities`));
    };

    useEffect(() => {
        if (urlProjectId.current === "" && projects !== null) {
            setVulnerability((vulnerability) => ({
                ...vulnerability, projectId: projects[0].id
            }));
        }
    }, [urlProjectId, projects]);
    useEffect(() => {
        if (categories !== null) {
            setVulnerability((vulnerability) => ({
                ...vulnerability, categoryId: categories[0].id
            }));
        }
    }, [categories]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb history={history}/>
            </div>
            <Title title="Create Vulnerability" icon={<IconPlus/>}/>

            {!projects || !categories ? <Loading/> :
                <form onSubmit={handleCreate}>
                    <label>
                        Project
                        <select name="projectId" id="projectId" onChange={handleFormChange}
                                value={vulnerability.projectId}>
                            {projects.map((project, index) =>
                                <option key={index} value={project.id}>{project.name}</option>
                            )}
                        </select>
                    </label>
                    <label>
                        Summary
                        <input type="text" name="summary" onChange={handleFormChange}
                               value={vulnerability.summary} required autoFocus/>
                    </label>
                    <label>Description
                        <textarea name="description" onChange={handleFormChange}
                                  value={vulnerability.description} required/>
                    </label>
                    <label>Risk
                        <select name="risk" onChange={handleFormChange} value={vulnerability.risk}>
                            {Risks.map((risk, index) =>
                                <option key={index} value={risk.id}>{risk.name}</option>
                            )}
                        </select>
                    </label>
                    <label>Category
                        <select name="categoryId" onChange={handleFormChange} value={vulnerability.categoryId || ""}>
                            {categories.map((category, index) =>
                                <option key={index} value={category.id}>{category.name}</option>
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
};

export default VulnerabilityCreate;
