import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable';
import secureApiFetch from '../../services/api';
import {useEffect, useState} from 'react';

const VulnerabilitiesSearchResults = ({keywords}) => {

    const [vulnerabilities, setVulnerabilities] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/vulnerabilities?keywords=${keywords}`, {method: 'GET'})
                .then(resp => {
                    return resp.json()
                })
                .then(json => {
                    setVulnerabilities(json);
                })
        }

        reloadData()
    }, [keywords])

    return <>
        <h3>{vulnerabilities.length} vulnerabilities matched</h3>
        <VulnerabilitiesTable vulnerabilities={vulnerabilities}/>
    </>
}

export default VulnerabilitiesSearchResults;
