import { useCallback, useState } from "react";

export const useCreateTipsContext = function(props) {
    const [leftCoordinate, setLeftCoordinate] = useState(0);
    const [topCoordinate, setTopCoordinate] = useState(0);
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

    // обновление расположения блока подсказок
    const updateTipsCoordinates = useCallback((ref) => {
        if (ref) {
            let rect = ref.current.getBoundingClientRect();
            setLeftCoordinate(rect.left);
            setTopCoordinate(rect.top); 
        }
    }, []);

    return { tips,
             addTip,
             removeTip,
             topCoordinate,
             leftCoordinate,
             updateTipsCoordinates };
}
