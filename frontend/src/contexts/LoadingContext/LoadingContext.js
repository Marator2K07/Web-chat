import { useCallback, useState } from "react"

export const useCreateLoadingContext = function() {
    const [loading, setLoading] = useState(false);
    const [holding, setHolding] = useState(false);

    const startLoading = useCallback(() => {
        setLoading(true);
        setHolding(true);
    }, []);

    const stopLoading = useCallback(() => {
        setLoading(false);
    }, []); 

    const toggleHolding = useCallback((holding, timeOffset) => {        
        setTimeout(() => {
            setHolding(holding);
        }, timeOffset);
    }, []);

    return { loading,
             holding,
             startLoading,
             stopLoading,
             toggleHolding };
}