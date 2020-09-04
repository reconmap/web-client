import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { useHistory, Link } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchResults = (props) => {
    useSetTitle('Search results');

    const history = useHistory();
    const [vulnerabilities, setVulnerabilities] = useState([]);

    const keywords = decodeURIComponent(props.match.params.keywords);

    useEffect(() => {
        const reloadData = () => {
            secureApiFetch(`/vulnerabilities?keywords=${keywords}`, { method: 'GET' })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setVulnerabilities(data);
                })
        }


        reloadData()
    }, [keywords])
    return <div>
        <Breadcrumb path={history.location.pathname} />
        <div>
            <h1>Search results for <em>{keywords}</em></h1>

            <h2>{vulnerabilities.length} vulnerabilities matched</h2>
            <ul>
                {
                    vulnerabilities.map((v, i) =>
                        <li>
                            <Link to={`/vulnerabilities/${v.id}`}>{v.summary}</Link>
                        </li>
                    )
                }
            </ul>
        </div>
    </div>
}

export default SearchResults
