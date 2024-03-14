import { useCallback, useState } from "react"

export const createResponseHandlerContext = function() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const reset = useCallback(() => {
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
             reset,
             toggleResponse,
             toggleError };
}