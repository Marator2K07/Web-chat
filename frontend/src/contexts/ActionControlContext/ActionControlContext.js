import { useCallback, useState } from "react"

export const useCreateActionControlContext = function() {
    const [acceptActionForm, setAcceptActionForm] = useState(false);
    const [action, setAction] = useState(null);

    const acceptionRequired = useCallback(() => {
        setAcceptActionForm(true);
    }, []);

    const acceptionReceived = useCallback(() => {
        setAcceptActionForm(false);
        setAction(null);
    }, []); 

    const saveAction = useCallback((action) => {
        setAction(action);
    }, []);

    return { action,
             acceptActionForm,
             acceptionRequired,
             acceptionReceived,
             saveAction };
}