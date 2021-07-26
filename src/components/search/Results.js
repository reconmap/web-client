import { Alert, AlertIcon } from '@chakra-ui/react';
import CommandsTable from 'components/commands/Table';
import PageTitle from 'components/logic/PageTitle';
import LinkButton from 'components/ui/buttons/Link';
import VulnerabilitiesTable from 'components/vulnerabilities/VulnerabilitiesTable';
import useQuery from 'hooks/useQuery';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import secureApiFetch from 'services/api';
import ProjectsTable from "../projects/Table";
import TasksTable from "../tasks/TasksTable";
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';

const SearchResults = () => {
    const params = useParams();
    const query = useQuery();
    const keywords = decodeURIComponent(params.keywords);

    const entitiesParam = query.has('entities') ? query.get('entities') : 'commands,tasks,vulnerabilities,projects';
    const entities = entitiesParam.split(',');

    const [results, setResults] = useState(entities.reduce((map, obj) => { map[obj] = []; return map; }, {}));

    useEffect(() => {
        if (entities.includes('commands'))
            secureApiFetch(`/commands?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, commands: json }));
                })
        if (entities.includes('tasks'))
            secureApiFetch(`/tasks?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, tasks: json }));
                })
        if (entities.includes('vulnerabilities'))
            secureApiFetch(`/vulnerabilities?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, vulnerabilities: json }));
                })
        if (entities.includes('projects'))
            secureApiFetch(`/projects?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setResults((prevResults) => ({ ...prevResults, projects: json }));
                })
    }, [keywords, entities]);

    const emptyResults = Object.keys(results)
        .filter(key => results[key].length === 0);

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

        {entities.includes('commands') && results.commands.length > 0 &&
            <>
                <h3>{results.commands.length} matching commands</h3>
                <CommandsTable commands={results.commands} />
            </>
        }
        {entities.includes('tasks') && results.tasks.length > 0 &&
            <>
                <h3>{results.tasks.length} matching tasks</h3>
                <TasksTable tasks={results.tasks} />
            </>
        }
        {entities.includes('vulnerabilities') && results.vulnerabilities.length > 0 &&
            <>
                <h3>{results.vulnerabilities.length} matching vulnerabilities</h3>
                <VulnerabilitiesTable vulnerabilities={results.vulnerabilities} />
            </>
        }
        {entities.includes('projects') && results.projects.length > 0 &&
            <>
                <h3>{results.projects.length} matching projects</h3>
                <ProjectsTable projects={results.projects} />
            </>
        }
    </>
}

export default SearchResults;
