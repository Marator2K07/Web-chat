import { useCallback, useState } from "react"
import { MOST_SHORT_DELAY } from "../../constants";

export const useCreateScrollContext = function (props) {
    const [topEdge, setTopEdge] = useState(true);
    const [bottomEdge, setBottomEdge] = useState(true);

    // обработка прокрутки по ссылке
    const handleScroll = useCallback((ref) => {
        let scrollComponent = ref.current;
        // важная предпроверка состояния неактивной полосы прокрутки
        if (scrollComponent.scrollTop === 0 &&
            scrollComponent.scrollTop + scrollComponent.clientHeight >=
            scrollComponent.scrollHeight - 1) {
            setTopEdge(true);
            setBottomEdge(true);

            return;
        }
        // небольшая задержка обязательна для более корректной работы
        let timeout = setTimeout(() => {
            // если верхняя граница прокрутки
            if (scrollComponent.scrollTop === 0) {
                setTopEdge(true);
                setBottomEdge(false);
            }
            // если нижняя граница прокрутки
            else if (scrollComponent.scrollTop + scrollComponent.clientHeight >=
                scrollComponent.scrollHeight - 1) {
                setTopEdge(false);
                setBottomEdge(true);
            } else {
                setTopEdge(false);
                setBottomEdge(false);
            }
        }, MOST_SHORT_DELAY * 3);
        return () => clearTimeout(timeout);
    }, [])

    return {
        topEdge,
        bottomEdge,
        handleScroll
    };
}