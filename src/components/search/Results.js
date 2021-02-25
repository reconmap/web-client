import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { IconSearch } from '../ui/Icons';
import Title from '../ui/Title';
import CommandsSearchResults from './CommandsSearchResults';
import TasksSearchResults from "./TasksSearchResults";
import VulnerabilitiesSearchResults from "./VulnerabilitiesSearchResults";

const SearchResults = (props) => {
    useSetTitle('Search results');

    const keywords = decodeURIComponent(props.match.params.keywords);

    return <>
        <div className='heading'>
            <Breadcrumb />
        </div>
        <Title type='Search results' title={`For ${keywords}`} icon={<IconSearch />} />

        <CommandsSearchResults keywords={keywords} />
        <TasksSearchResults keywords={keywords} />
        <VulnerabilitiesSearchResults keywords={keywords} />
    </>
}

export default SearchResults
