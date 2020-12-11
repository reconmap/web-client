import useSetTitle from '../../hooks/useSetTitle';
import Title from '../ui/Title';
import Breadcrumb from '../ui/Breadcrumb';
import {IconSearch} from '../ui/Icons';
import VulnerabilitiesSearchResults from "./VulnerabilitiesSearchResults";
import TasksSearchResults from "./TasksSearchResults";

const SearchResults = (props) => {
    useSetTitle('Search results');

    const keywords = decodeURIComponent(props.match.params.keywords);

    return <>
        <div className='heading'>
            <Breadcrumb/>
        </div>
        <Title type='Search results' title={`For ${keywords}`} icon={<IconSearch/>}/>

        <TasksSearchResults keywords={keywords}/>
        <VulnerabilitiesSearchResults keywords={keywords}/>
    </>
}

export default SearchResults
