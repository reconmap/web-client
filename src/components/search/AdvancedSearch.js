import { Button, Checkbox } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';

const AdvancedSearch = () => {
    const history = useHistory();

    const [keywords, setKeywords] = useState('');
    const [entities, setEntities] = useState(['commands', 'tasks', 'vulnerabilities', 'projects']);

    const onFormSubmit = (ev) => {
        ev.preventDefault();

        history.push(`/search/${keywords}?entities=` + entities.join(','));
    }

    const onKeywordsChange = ev => {
        setKeywords(ev.target.value);
    };


    const onFormInputChange = ev => {
        const target = ev.target;
        const value = target.value;

        setEntities(target.checked ? [...entities, value] : entities.filter(entity => entity !== value));
    };


    return <>
        <PageTitle value={`Advanced search`} />
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type='Advanced search' title="Search form" icon={<IconSearch />} />

        <form onSubmit={onFormSubmit}>
            <input type="search" name="keywords" value={keywords} onChange={onKeywordsChange} placeholder="Keywords" />

            <Checkbox isChecked={entities.includes('commands')} value="commands" onChange={onFormInputChange}>Commands</Checkbox>
            <Checkbox isChecked={entities.includes('tasks')} value="tasks" onChange={onFormInputChange}>Tasks</Checkbox>
            <Checkbox isChecked={entities.includes('vulnerabilities')} value="vulnerabilities" onChange={onFormInputChange}>Vulnerabilities</Checkbox>
            <Checkbox isChecked={entities.includes('projects')} value="projects" onChange={onFormInputChange}>Projects</Checkbox>

            <Button type="submit" isDisabled={entities.length === 0}>Search</Button>
        </form>
    </>
}

export default AdvancedSearch;
