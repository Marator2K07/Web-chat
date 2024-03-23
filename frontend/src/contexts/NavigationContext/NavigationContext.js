import { useCallback, useState } from "react"

export const useCreateNavigationContext = function() {
    const [headerText, setHeaderText] = useState();
    const [mainBlock, setMainBlock] = useState();
    const [index, setIndex] = useState();    

    const goNavigation = useCallback((header, block, index) => {
        setHeaderText(header);
        setMainBlock(block);
        setIndex(index);
    }, []);

    return { headerText,
             mainBlock,
             index,
             goNavigation };
}