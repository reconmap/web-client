import useSetTitle from '../../hooks/useSetTitle';
import Title from '../ui/Title';
import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable';
import Breadcrumb from '../ui/Breadcrumb';
import {useHistory} from 'react-router-dom';
import secureApiFetch from '../../services/api';
import {useEffect, useState} from 'react';
import {IconSearch} from '../ui/Icons';

const SearchResults = (props) => {
    useSetTitle('Search results');

    const history = useHistory();
    const [vulnerabilities, setVulnerabilities] = useState([]);

    const keywords = decodeURIComponent(props.match.params.keywords);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/vulnerabilities?keywords=${keywords}`, {method: 'GET'})
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setVulnerabilities(data);
                })
        }


        reloadData()
    }, [keywords])
    return <>
        <div className='heading'>
            <Breadcrumb history={history}/>
        </div>
        <Title type='Search results' title={`For ${keywords}`} icon={<IconSearch/>}/>
        <h3>{vulnerabilities.length} vulnerabilities matched</h3>
        <VulnerabilitiesTable vulnerabilities={vulnerabilities}/>
    </>
}

export default SearchResults
