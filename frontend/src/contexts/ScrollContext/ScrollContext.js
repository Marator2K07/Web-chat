import { useCallback, useState } from "react"
import { MOST_SHORT_DELAY } from "../../constants";

export const useCreateScrollContext = function(props) {
    const [topEdge, setTopEdge] = useState(true);
    const [bottomEdge, setBottomEdge] = useState(true);

    // обработка прокрутки по ссылке
    const handleScroll = useCallback((ref) => {
        let scrollComponent = ref.current;
        // небольшая задержка обязательна для более корректной работы
        let timeout = setTimeout(() => {
            // если верхняя граница прокрутки
            if (scrollComponent.scrollTop === 0) {
                setTopEdge(true);
            } else {
                setTopEdge(false);
            }
            // если нижняя граница
            if (scrollComponent.scrollTop + scrollComponent.clientHeight >=
                scrollComponent.scrollHeight) {
                setBottomEdge(true);
            } else {
                setBottomEdge(false);
            }
        }, MOST_SHORT_DELAY * 3);
        return () => clearTimeout(timeout);
    }, [])

    return { topEdge,
             bottomEdge,
             handleScroll };
}