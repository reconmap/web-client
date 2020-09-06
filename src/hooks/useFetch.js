import React, { useCallback } from 'react'
import secureApiFetch from '../services/api'

export default function useFetch(endpoint) {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);
    const fetchData = useCallback(async () => {
        try {
            const response = await secureApiFetch(endpoint, { method: 'GET' })
            const responseJSON = await response.json()
            setResponse(responseJSON)
        } catch (error) {
            setError(error);
        }
    }, [endpoint]);
    React.useEffect(() => {
        fetchData();
    }, [fetchData]);
    return [response, fetchData, error];

}
