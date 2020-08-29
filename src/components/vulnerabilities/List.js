import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import DeleteButton from '../ui/buttons/Delete';
import useSetTitle from './../../hooks/useSetTitle'
import NoResults from '../ui/NoResults';
import Loading from '../ui/Loading';
import RiskBadge from '../badges/RiskBadge';
import useDelete from '../../hooks/useDelete';
import useFetch from '../../hooks/useFetch';
import CreateButton from '../ui/buttons/Create';
import Breadcrumb from '../ui/Breadcrumb';
import Pagination from '../layout/Pagination';

const VulnerabilitiesList = ({history}) => {
    useSetTitle('Vulnerabilities')


    const [pagination, setPagination] = useState({ page: 0, total: 0 })

    const handlePrev = () => {
        setPagination({ ...pagination, page: pagination.page - 1 })
    }
    const handleNext = () => {
        setPagination({ ...pagination, page: pagination.page + 1 })
    }


    
    const [vulnerabilities, update] = useFetch(`/vulnerabilities?page=${pagination.page}`)
    const destroy = useDelete('/vulnerabilities/', update);

    return (<>
        <Breadcrumb path={history.location.pathname} />

        <div className='heading'>
            <h1>Vulnerabilities</h1>
            <Pagination page={pagination.page} total={pagination.total} handlePrev={handlePrev} handleNext={handleNext} />

            <CreateButton>Create Vulnerability</CreateButton>
        </div>
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
                                <td>OPEN</td>
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