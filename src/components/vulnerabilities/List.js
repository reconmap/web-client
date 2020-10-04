import React, {useCallback, useEffect, useState} from 'react'
import useSetTitle from './../../hooks/useSetTitle'
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import Breadcrumb from '../ui/Breadcrumb';
import Pagination from '../layout/Pagination';
import secureApiFetch from '../../services/api';
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable';
import CreateButton from '../ui/buttons/Create';

const VulnerabilitiesList = ({match, history}) => {
    let {pageNumber} = match.params;
    pageNumber = pageNumber !== undefined ? parseInt(pageNumber) : 1;
    const page = pageNumber - 1;

    useSetTitle(`Vulnerabilities - Page ${pageNumber}`)

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [numberPages, setNumberPages] = useState(0)

    const handlePrev = () => {
        history.push(`/vulnerabilities/${pageNumber - 1}`);
    }
    const handleNext = () => {
        history.push(`/vulnerabilities/${pageNumber + 1}`);
    }

    const reloadData = useCallback(() => {
        secureApiFetch(`/vulnerabilities?page=${page}`, {method: 'GET'})
            .then((response) => {
                if (response.headers.has('X-Page-Count')) {
                    setNumberPages(response.headers.get('X-Page-Count'))
                }
                return response.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
    }, [page]);

    useEffect(() => {
        reloadData()
    }, [reloadData])

    const destroy = useDelete('/vulnerabilities/', reloadData);
    const handleCreateVulnerability = () => {
        history.push(`/vulnerabilities/create`)
    }

    return (
        <>
            <div className='heading'>
                <Breadcrumb history={history}/>
                <Pagination page={page} total={numberPages} handlePrev={handlePrev}
                            handleNext={handleNext}/>
                <CreateButton onClick={handleCreateVulnerability}>Create Vulnerability</CreateButton>
            </div>
            {!vulnerabilities ? <Loading/> : vulnerabilities.length === 0 ? <NoResults/> :
                <VulnerabilitiesTable vulnerabilities={vulnerabilities} destroy={destroy}/>
            }
        </>
    )
}

export default VulnerabilitiesList
