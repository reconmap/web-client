import React from 'react'
import secureApiFetch from '../services/api'

export default function useFetch(endpoint) {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const fetchData = async () => {
        try {
            const response = await secureApiFetch(endpoint, { method: 'GET' })
            const responseJSON = await response.json()
            setResponse(responseJSON)
        } catch (error) {
            setError(error);
        }
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    return [response, fetchData, error ];

}
