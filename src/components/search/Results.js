import React from 'react'
import useSetTitle from '../../hooks/useSetTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { useHistory } from 'react-router-dom';
import secureApiFetch from '../../services/api';
import { useEffect } from 'react';
import { useState } from 'react';

const SearchResults = (props) => {
    useSetTitle('Search results');

    const history = useHistory();    
    const [vulnerabilities, setVulnerabilities] = useState([]);
    
    const keywords = decodeURIComponent(props.match.params.keywords);

    const reloadData = () => {
        secureApiFetch(`/vulnerabilities?keywords=${keywords}`, { method: 'GET' })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setVulnerabilities(data);
            })
    }

    useEffect(() => {
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
                        {v.summary}
                    </li>
                )
                }
            </ul>
        </div>
    </div>
}

export default SearchResults
