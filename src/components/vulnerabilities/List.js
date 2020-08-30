import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DeleteButton from '../ui/buttons/Delete';
import useSetTitle from './../../hooks/useSetTitle'
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import RiskBadge from '../badges/RiskBadge';
import useDelete from '../../hooks/useDelete';
import CreateButton from '../ui/buttons/Create';
import Breadcrumb from '../ui/Breadcrumb';
import Pagination from '../layout/Pagination';
import secureApiFetch from '../../services/api';

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
        {!vulnerabilities ? <Loading /> : vulnerabilities.length === 0 ? <NoResults />
            : <table className='w-full my-4'>
                <thead>
                    <tr>
                        <th>Summary</th>
                        <th>Risk</th>
                        <th><abbr title="Common Vulnerability Scoring System">CVSS</abbr> score</th>
                        <th>Status</th>
                        <th>Date/Time</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vulnerabilities.map((vulnerability, index) => {
                        return (
                            <tr key={index}>
                                <th><Link className='flex flex-col' to={`/vulnerabilities/${vulnerability.id}`}>
                                    <span>{vulnerability.summary}</span>
                                    {vulnerability.description}
                                </Link></th>

                                <td><RiskBadge risk={vulnerability.risk} /></td>
                                <td>{vulnerability.cvss_score}</td>
                                <td>{vulnerability.status}</td>
                                <td>{vulnerability.insert_ts}</td>

                                <td className='text-right   '><DeleteButton onClick={() => destroy(vulnerability.id)} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        }
    </>)
}

export default VulnerabilitiesList