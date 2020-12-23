import React, {useEffect, useRef, useState} from 'react'
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Risks from '../../models/Risks'
import useFetch from '../../hooks/useFetch'
import Loading from '../ui/Loading';
import Primary from '../ui/buttons/Primary';
import Title from '../ui/Title';
import {IconPlus} from '../ui/Icons';
import useSetTitle from "../../hooks/useSetTitle";
import {actionCompletedToast} from "../ui/toast";

const VulnerabilityEdit = () => {
    const {vulnerabilityId} = useParams();

    useSetTitle('Edit Vulnerability');

    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlProjectId = useRef(searchParams.get('projectId') || "");
    const [projects] = useFetch('/projects');
    const [categories] = useFetch('/vulnerabilities/categories');
    const [savedVulnerability] = useFetch(`/vulnerabilities/${vulnerabilityId}`);
    const [updatedVulnerability, setVulnerability] = useState(null);

    const [loading, setLoading] = useState(false)

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setVulnerability({...updatedVulnerability, [name]: value});
    };

    const onFormSubmit = async ev => {
        ev.preventDefault();

        setLoading(true)
        await secureApiFetch(`/vulnerabilities/${vulnerabilityId}`, {
            method: 'PUT',
            body: JSON.stringify(updatedVulnerability)
        });

        actionCompletedToast(`Vulnerability "${updatedVulnerability.summary}" updated.`);

        history.push(`/vulnerabilities/${vulnerabilityId}`)
    };

    useEffect(() => {
        if (urlProjectId.current === "" && projects !== null) {
            setVulnerability((vulnerability) => ({
                ...vulnerability, project_id: projects[0].id
            }));
        }
    }, [urlProjectId, projects]);
    useEffect(() => {
        if (categories !== null) {
            setVulnerability((vulnerability) => ({
                ...vulnerability, category_id: categories[0].id
            }));
        }
    }, [categories]);

    useEffect(() => {
        if (savedVulnerability)
            setVulnerability(savedVulnerability);
    }, [savedVulnerability]);

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="Edit Vulnerability" icon={<IconPlus/>}/>

            {!projects || !categories ? <Loading/> :
                <form onSubmit={onFormSubmit}>
                    <label>
                        Project
                        <select name="project_id" id="projectId" onChange={handleFormChange}
                                value={updatedVulnerability.project_id}>
                            {projects.map((project, index) =>
                                <option key={index} value={project.id}>{project.name}</option>
                            )}
                        </select>
                    </label>
                    <label>
                        Summary
                        <input type="text" name="summary" onChange={handleFormChange}
                               value={updatedVulnerability.summary} required autoFocus/>
                    </label>
                    <label>Description
                        <textarea name="description" onChange={handleFormChange}
                                  value={updatedVulnerability.description} required/>
                    </label>
                    <label>Risk
                        <select name="risk" onChange={handleFormChange} value={updatedVulnerability.risk}>
                            {Risks.map((risk, index) =>
                                <option key={index} value={risk.id}>{risk.name}</option>
                            )}
                        </select>
                    </label>
                    <label>Category
                        <select name="category_id" onChange={handleFormChange}
                                value={updatedVulnerability.category_id}>
                            {categories.map((category, index) =>
                                <option key={index} value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </label>
                    <label>CVSS score
                        <input type="number" step="0.1" min="0" max="10" name="cvss_score"
                               onChange={handleFormChange}
                               value={updatedVulnerability.cvss_score || ""}/>
                    </label>
                    <label><span>CVSS vector<br/><small>eg: AV:N/AC:L/Au:S/C:P/I:P/A:N</small></span>
                        <input type="text" name="cvss_vector" onChange={handleFormChange}
                               value={updatedVulnerability.cvss_vector || ""}/>
                    </label>

                    <Primary type="submit"
                             disabled={loading}>Update</Primary>
                </form>
            }
        </div>
    )
};

export default VulnerabilityEdit;
