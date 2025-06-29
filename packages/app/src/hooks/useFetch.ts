import { useCallback, useEffect, useState } from "react";
import secureApiFetch from "../services/api.js";

const useFetch = (endpoint: string, text: boolean = false) => {
    const [responseBody, setResponseBody] = useState(null);
    const [error, setError] = useState(null);
    const fetchData = useCallback(async () => {
        setResponseBody(null);
        try {
            const resp = await secureApiFetch(endpoint, { method: "GET" });
            const body = await (text ? resp.text() : resp.json());
            setResponseBody(body);
        } catch (err: any) {
            setError(err);
        }
    }, [endpoint, text]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [responseBody, fetchData, error];
};

export default useFetch;
