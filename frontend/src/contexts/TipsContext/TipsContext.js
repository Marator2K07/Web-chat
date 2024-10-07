import { useCallback, useState } from "react";

export const useCreateTipsContext = function(props) {
    const [activeInput, setActiveInput] = useState(null);
    const [tips, setTips] = useState({});

    // пишем подсказку
    const addTip = useCallback((property, info) => {
        setTips(prevState => ({
            ...prevState,
            [property]: info
        }));
    }, []);

    // таким образом убираем подсказку
    const removeTip = useCallback((property) => {
        setTips(nextState => {
            let {property, ...newTips} = nextState;
            return newTips;
        });
    }, []);

    const newActiveInput = useCallback((ref) => {
        setActiveInput(ref);
    }, []);

    return { tips,
             addTip,
             removeTip,
             activeInput,
             newActiveInput };
}
