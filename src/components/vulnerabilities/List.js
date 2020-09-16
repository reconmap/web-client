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

const VulnerabilitiesList = ({history}) => {
    useSetTitle('Vulnerabilities')

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [pagination, setPagination] = useState({page: 0, total: 0})

    const handlePrev = () => {
        setPagination({...pagination, page: pagination.page - 1})
    }
    const handleNext = () => {
        setPagination({...pagination, page: pagination.page + 1})
    }

    const reloadData = useCallback(() => {
        secureApiFetch(`/vulnerabilities?page=${pagination.page}`, {method: 'GET'})
            .then((response) => {
                if (response.headers.has('X-Page-Count')) {
                    // noinspection JSCheckFunctionSignatures
                    setPagination(pagination => {
                        return {...pagination, total: response.headers.get('X-Page-Count')}
                    })
                }
                return response.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
    }, [pagination.page]);

    useEffect(() => {
        reloadData()
    }, [reloadData])

    const destroy = useDelete('/vulnerabilities/', reloadData);
    const handleCreateVulnerability = () => {history.push(`/vulnerabilities/create`)}
    return (<>
        <div className='heading'>
            <Breadcrumb path={history.location.pathname}/>
            <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev}
                        handleNext={handleNext}/>
            <CreateButton onClick={handleCreateVulnerability}>Create Vulnerability</CreateButton>
        </div>
        {!vulnerabilities ? <Loading/> : vulnerabilities.length === 0 ? <NoResults/> :
            <VulnerabilitiesTable vulnerabilities={vulnerabilities} destroy={destroy}/>
        }
    </>)
}

export default VulnerabilitiesList
