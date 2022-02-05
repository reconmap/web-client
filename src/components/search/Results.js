import { Alert, AlertIcon } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import LinkButton from 'components/ui/buttons/Link';
import useQuery from 'hooks/useQuery';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureApiFetch from 'services/api';
import ProjectsTable from "../projects/Table";
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsSearchResults from './CommandsSearchResults';
import TasksSearchResults from './TasksSearchResults';
import VulnerabilitiesSearchResults from './VulnerabilitiesSearchResults';
import VulnerabilityTemplatesSearchResults from './VulnerabilityTemplatesSearchResults';

const SearchResults = React.memo(() => {
    const params = useParams();
    const query = useQuery();
    const keywords = decodeURIComponent(params.keywords);

    const entitiesParam = query.has('entities') ? query.get('entities') : 'commands,tasks,vulnerabilities,vulnerability_templates,projects,project_templates';
    const entities = useMemo(() => entitiesParam.split(','), [entitiesParam]);

    const [results, setResults] = useState(entities.reduce((map, obj) => { map[obj] = []; return map; }, {}));
    const [emptyResults, setEmptyResults] = useState([]);

    useEffect(() => {
        if (entities.includes('projects'))
            secureApiFetch(`/projects?isTemplate=0&keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, projects: json }));
                })
        if (entities.includes('project_templates'))
            secureApiFetch(`/projects?isTemplate=1&keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, project_templates: json }));
                })
    }, [keywords, entities]);

    return <>
        <PageTitle value={`${keywords} search results`} />
        <div className='heading'>
            <Breadcrumb />
            <div>
                <LinkButton href="/advanced-search">Advanced search</LinkButton>
            </div>
        </div>
        <Title type='Search results' title={`For ${keywords}`} icon={<IconSearch />} />

        {emptyResults.length > 0 &&
            <Alert status="warning">
                <AlertIcon />
                No results were found for: {emptyResults.join(', ')}
            </Alert>
        }

        {entities.includes('commands') && <CommandsSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('tasks') && <TasksSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('vulnerabilities') && <VulnerabilitiesSearchResults keywords={keywords} />}
        {entities.includes('vulnerability_templates') && <VulnerabilityTemplatesSearchResults keywords={keywords} />}

        {entities.includes('projects') && results.projects.length > 0 &&
            <>
                <h3>{results.projects.length} matching projects</h3>
                <ProjectsTable projects={results.projects} />
            </>
        }
        {entities.includes('project_templates') && results.project_templates.length > 0 &&
            <>
                <h3>{results.project_templates.length} matching project templates</h3>
                <ProjectsTable projects={results.project_templates} />
            </>
        }
    </>
})

export default SearchResults;
