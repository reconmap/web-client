import React, { useState, useEffect } from 'react'
import useSetTitle from './../../hooks/useSetTitle'
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import useDelete from '../../hooks/useDelete';
import CreateButton from '../ui/buttons/Create';
import Breadcrumb from '../ui/Breadcrumb';
import Pagination from '../layout/Pagination';
import secureApiFetch from '../../services/api';
import VulnerabilitiesTable from '../tables/VulnerabilitiesTable';

const VulnerabilitiesList = ({ history }) => {
    useSetTitle('Vulnerabilities')

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [pagination, setPagination] = useState({ page: 0, total: 0 })

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }
    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }

    const reloadData = () => {
        secureApiFetch(`/vulnerabilities?page=${pagination.page}`, { method: 'GET' })
            .then((response) => {
                if (response.headers.has('X-Page-Count')) {
                    setPagination({ ...pagination, total: response.headers.get('X-Page-Count') })
                }
                return response.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
    }

    useEffect(() => {
        pagination && reloadData()
    }, [pagination.page])

    const destroy = useDelete('/vulnerabilities/', reloadData);

    return (<>
        <div className='heading'>
            <Breadcrumb path={history.location.pathname} />
            <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev} handleNext={handleNext} />
            <CreateButton>Create Vulnerability</CreateButton>
        </div>
        <h1>Vulnerabilities</h1>
        {!vulnerabilities ? <Loading /> : vulnerabilities.length === 0 ? <NoResults /> : <VulnerabilitiesTable vulnerabilities={vulnerabilities} destroy={destroy}/>
        }
    </>)
}

export default VulnerabilitiesList