import { useCallback, useEffect, useState } from "react";

type UseFetchResponse<T> = {
    data: T | null;
    refetch: () => Promise<void>;
    isError: boolean;
    error: Error | null;
    isLoading: boolean;
};

function useFetchRequest<T>(request: Request): UseFetchResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        setError(null);
        setData(null);

        try {
            const response = await fetch(request);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const body = await response.json();
            setData(body as T);
        } catch (err) {
            setIsError(true);
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, refetch: fetchData, isError, error, isLoading };
}

export default useFetchRequest;
