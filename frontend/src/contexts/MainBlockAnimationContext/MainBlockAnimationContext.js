import { useCallback, useState } from "react"
import { SHORT_DELAY } from "../../constants";

export const useCreateMainBlockAnimationContext = function() {
    const [x, setX] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [duration, setDuration] = useState(SHORT_DELAY/3000);

    const initCondition = useCallback(() => {
            setX(0);
            setOpacity(1);   
    }, []); 

    const leftCondition = useCallback(() => {
            setX("-28vw");
            setOpacity(0);
    }, []);

    const rightCondition = useCallback(() => {
            setX("28vw");
            setOpacity(0);
    }, []);

    const changeDuration = useCallback((duration) => {
        setDuration(duration);
    }, []);

    return { x,
             opacity,
             duration,
             initCondition,
             leftCondition,
             rightCondition,
             changeDuration };
}