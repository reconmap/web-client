import ProjectsTable from 'components/projects/Table';
import { useEffect, useState } from 'react';
import { requestEntities } from 'utilities/requests.js';

const ProjectTemplatesSearchResults = ({ keywords, emptyResultsSetter: setEmptyResults }) => {

    const [projectTemplates, setProjectTemplates] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            requestEntities(`/projects?isTemplate=1&keywords=${keywords}`)
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
