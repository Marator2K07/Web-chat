import { useCallback, useState } from "react"

export const useCreateActionControlContext = function() {
    const [acceptActionForm, setAcceptActionForm] = useState(false);

    const acceptionRequired = useCallback(() => {
        setAcceptActionForm(true);
    }, []);

    const acceptionReceived = useCallback(() => {
        setAcceptActionForm(false);
    }, []); 

    return { acceptActionForm,
             acceptionRequired,
             acceptionReceived };
}