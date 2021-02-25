import { useEffect, useState } from 'react';
import secureApiFetch from '../../services/api';
import VulnerabilitiesTable from '../vulnerabilities/VulnerabilitiesTable';

const VulnerabilitiesSearchResults = ({ keywords }) => {

    const [vulnerabilities, setVulnerabilities] = useState([]);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/vulnerabilities?keywords=${keywords}`, { method: 'GET' })
                .then(resp => resp.json())
                .then(json => {
                    setVulnerabilities(json);
                })
        }

        reloadData()
    }, [keywords])

    return <>
        <h3>{vulnerabilities.length} matching vulnerabilities</h3>
        <VulnerabilitiesTable vulnerabilities={vulnerabilities} />
    </>
}

export default VulnerabilitiesSearchResults;
