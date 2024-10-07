import { useCallback, useState } from "react";
import { MOST_SHORT_DELAY } from "../../constants";

export const useCreateTipsContext = function(props) {
    const [currentRef, setCurrentRef] = useState(null);
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
            let {[property]: prop, ...newTips} = nextState;
            return newTips;
        });
    }, []);

    // прикрепление расположения блока подсказок
    const newTipsCoordinates = useCallback((ref) => {
        setTimeout(() => {
            if (ref) {
                setCurrentRef(ref.current);
                let rect = ref.current.getBoundingClientRect();
                setLeftCoordinate(rect.left);
                setTopCoordinate(rect.top + rect.height); 
            }
        }, MOST_SHORT_DELAY*3); 
    }, []);

    // обновление расположения блока подсказок
    const updateTipsCoordinates = useCallback(() => {
        let timeout = setTimeout(() => {
            if (currentRef) {
                let rect = currentRef.getBoundingClientRect();
                setLeftCoordinate(rect.left);
                setTopCoordinate(rect.top + rect.height); 
            }
        }, MOST_SHORT_DELAY*3); 
        return () => clearTimeout(timeout);
    }, [currentRef]);

    // сброс состояния
    const resetState = useCallback(() => {
        setTips({});
    }, []);

    return { tips,
             addTip,
             removeTip,
             topCoordinate,
             leftCoordinate,
             newTipsCoordinates,
             updateTipsCoordinates,
             resetState };
}
