import { useCallback, useState } from "react";

export const useCreateTipsContext = function(props) {
    const [tips, setTips] = useState({});

    const addTip = useCallback((property, info) => {
        // пишем подсказку
        setTips(prevState => ({
            ...prevState,
            [property]: info
        }));
    }, []);

    const removeTip = useCallback((property) => {
        // таким образом убираем подсказку
        setTips(nextState => {
            let {property, ...newTips} = nextState;
            return newTips;
        });
    }, []);

    return { tips, addTip, removeTip };
}
