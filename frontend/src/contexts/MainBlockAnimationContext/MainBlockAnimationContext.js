import { useCallback, useState } from "react"
import { MOST_SHORT_DELAY, SHORT_DELAY } from "../../constants";

export const useCreateMainBlockAnimationContext = function() {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [duration, setDuration] = useState(SHORT_DELAY/3000);

    const initCondition = useCallback(() => {
        setX(0);
        setY(0);
        setOpacity(1);   
    }, []); 

    const leftCondition = useCallback(() => {
        setX("-25vw");
        setOpacity(0);
    }, []);

    const rightCondition = useCallback(() => {
        setX("25vw");
        setOpacity(0);
    }, []);

    const shake = useCallback(() => {
        let min = -22;
        let max = 22;
        setX(Math.floor(Math.random() * (max - min) + min)+'px');
        setY(Math.floor(Math.random() * (max - min) + min)+'px');
        setTimeout(() => {
            setX(Math.floor(Math.random() * (max - min) + min)+'px');
            setY(Math.floor(Math.random() * (max - min) + min)+'px');
        }, MOST_SHORT_DELAY);
        setTimeout(() => {
            setX(Math.floor(Math.random() * (max - min) + min)+'px');
            setY(Math.floor(Math.random() * (max - min) + min)+'px');
        }, MOST_SHORT_DELAY*2);
        setTimeout(() => {
            setX(Math.floor(Math.random() * (max - min) + min)+'px');
            setY(Math.floor(Math.random() * (max - min) + min)+'px');
        }, MOST_SHORT_DELAY*3);
        setTimeout(() => {
            setX(0);
            setY(0);
        }, MOST_SHORT_DELAY*4);
    }, []);

    const changeDuration = useCallback((duration) => {
        setDuration(duration);
    }, []);

    return { x,
             y,
             opacity,
             duration,
             initCondition,
             leftCondition,
             rightCondition,
             shake,
             changeDuration };
}