import { Button, Checkbox } from '@chakra-ui/react';
import PageTitle from 'components/logic/PageTitle';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';

const AdvancedSearch = () => {
    const history = useHistory();

    const entityList = {
        'commands': 'Commands',
        'tasks': 'Tasks',
        'vulnerabilities': 'Vulnerabilities',
        'vulnerability_templates': 'Vulnerability templates',
        'projects': 'Projects',
        'project_templates': 'Project templates'
    };

    const [keywords, setKeywords] = useState('');
    const [entities, setEntities] = useState(Object.keys(entityList));

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

            {Object.keys(entityList).map((objectKey) =>
                <Checkbox isChecked={entities.includes(objectKey)} value={objectKey} onChange={onFormInputChange}>{entityList[objectKey]}</Checkbox>
            )}

            <Button type="submit" isDisabled={keywords.length === 0 || entities.length === 0}>Search</Button>
        </form>
    </>
}

export default AdvancedSearch;
