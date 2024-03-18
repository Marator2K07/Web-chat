import { useCallback, useState } from "react"

export const useCreateMainBlockAnimationContext = function() {
    const [y, setY] = useState(0);
    const [opacity, setOpacity] = useState(1);

    const initCondition = useCallback(() => {
        setY(0);
        setOpacity(1);
    }, []); 

    const startCondition = useCallback(() => {
        setY(-200);
        setOpacity(0);
    }, []);

    const endCondition = useCallback(() => {
        setY(200);
        setOpacity(0);
    }, []);

    return { y,
             opacity,
             initCondition,
             startCondition,
             endCondition };
}