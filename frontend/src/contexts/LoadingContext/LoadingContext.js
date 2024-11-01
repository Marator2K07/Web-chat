import { useCallback, useState } from "react"

export const useCreateLoadingContext = function () {
    const [loading, setLoading] = useState(false);
    const [holding, setHolding] = useState(false);

    const startLoading = useCallback(() => {
        setLoading(true);
        setHolding(true);
    }, []);

    const stopLoading = useCallback(() => {
        setLoading(false);
    }, []);

    const toggleHolding = useCallback((value, timeOffset = 0) => {
        setTimeout(() => {
            setHolding(value);
        }, timeOffset);
    }, []);

    return {
        loading,
        holding,
        startLoading,
        stopLoading,
        toggleHolding
    };
}