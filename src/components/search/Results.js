import { Alert, AlertIcon } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import LinkButton from 'components/ui/buttons/Link';
import useQuery from 'hooks/useQuery';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsSearchResults from './CommandsSearchResults';
import ProjectsSearchResults from './ProjectsSearchResults';
import ProjectTemplatesSearchResults from './ProjectTemplatesSearchResults';
import TasksSearchResults from './TasksSearchResults';
import VulnerabilitiesSearchResults from './VulnerabilitiesSearchResults';
import VulnerabilityTemplatesSearchResults from './VulnerabilityTemplatesSearchResults';

const SearchResults = React.memo(() => {
    const params = useParams();
    const query = useQuery();
    const keywords = decodeURIComponent(params.keywords);

    const entitiesParam = query.has('entities') ? query.get('entities') : 'commands,tasks,vulnerabilities,vulnerability_templates,projects,project_templates';
    const entities = useMemo(() => entitiesParam.split(','), [entitiesParam]);

    const [emptyResults, setEmptyResults] = useState([]);

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
                No results were found for: {[...new Set([...emptyResults])].join(', ')}
            </Alert>
        }

        {entities.includes('commands') &&
            <CommandsSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('tasks') &&
            <TasksSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('vulnerabilities') &&
            <VulnerabilitiesSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('vulnerability_templates') &&
            <VulnerabilityTemplatesSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('projects') &&
            <ProjectsSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
        {entities.includes('project_templates') &&
            <ProjectTemplatesSearchResults keywords={keywords} emptyResultsSetter={setEmptyResults} />}
    </>
})

export default SearchResults;
