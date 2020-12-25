import React, {useEffect, useRef, useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import Breadcrumb from '../ui/Breadcrumb';
import Risks from '../../models/Risks'
import useFetch from '../../hooks/useFetch'
import Title from '../ui/Title';
import {IconPlus} from '../ui/Icons';
import useSetTitle from "../../hooks/useSetTitle";
import VulnerabilityForm from "./Form";

const VulnerabilityCreate = () => {

    useSetTitle('Add vulnerability');

    const history = useHistory();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const urlProjectId = useRef(searchParams.get('projectId') || "");

    const [projects] = useFetch('/projects');
    const [categories] = useFetch('/vulnerabilities/categories');

    const [vulnerability, setVulnerability] = useState({
        project_id: urlProjectId.current,
        summary: "",
        description: "",
        risk: Risks[0].id,
        category_id: null,
        cvss_score: null,
        cvss_vector: null,
        target_id: null,
    })

    const handleFormChange = ev => {
        const target = ev.target;
        const name = target.name;
        const value = target.value;
        setVulnerability({...vulnerability, [name]: value});
    };

    const onFormSubmit = ev => {
        ev.preventDefault();

        secureApiFetch(`/vulnerabilities`, {method: 'POST', body: JSON.stringify(vulnerability)})
            .then(r => history.push(`/vulnerabilities`));
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

    return (
        <div>
            <div className='heading'>
                <Breadcrumb>
                    <Link to="/vulnerabilities">Vulnerabilities</Link>
                </Breadcrumb>
            </div>
            <Title title="Add vulnerability" icon={<IconPlus/>}/>

            <VulnerabilityForm vulnerability={vulnerability} projects={projects} categories={categories}
                               onFormSubmit={onFormSubmit}
                               onFormChange={handleFormChange}/>
        </div>
    )
};

export default VulnerabilityCreate;
