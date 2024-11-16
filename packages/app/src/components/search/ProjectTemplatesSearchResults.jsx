import ProjectsTable from 'components/projects/Table';
import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';

const ProjectTemplatesSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [projectTemplates, setProjectTemplates] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/projects?isTemplate=1&keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(projectTemplates => {
                    setProjectTemplates(projectTemplates);
                    setEmptyResults(emptyResults => 0 === projectTemplates.length ? emptyResults.concat('project_templates') : emptyResults.filter(value => value !== 'project_templates'));
                })
        }

        reloadData()
    }, [keywords, setEmptyResults])

    if (projectTemplates.length === 0) return <></>

    return <>
        <h3>{projectTemplates.length} matching project templates</h3>
        <ProjectsTable projects={projectTemplates} />
    </>
}

export default ProjectTemplatesSearchResults;
