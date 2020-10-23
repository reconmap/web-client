import {useCallback, useEffect, useState} from 'react'
import secureApiFetch from '../services/api'

export default function useFetch(endpoint) {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            const response = await secureApiFetch(endpoint, {method: 'GET'})
            const responseJSON = await response.json()
            setResponse(responseJSON)
        } catch (error) {
            setError(error);
        }
    }, [endpoint]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return [response, fetchData, error];

}
