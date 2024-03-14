import { useCallback, useState } from "react"

export const useCreateResponseHandlerContext = function() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const resetResult = useCallback(() => {
        setResponse(null);
        setError(null);
    }, []);

    const toggleResponse = useCallback((response) => {
        setResponse(response);
    }, []); 

    const toggleError = useCallback((error) => {
        setError(error);
    }, []); 

    return { response,
             error,
             resetResult,
             toggleResponse,
             toggleError };
}