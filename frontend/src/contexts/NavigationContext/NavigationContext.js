import { useCallback, useState } from "react"

export const useCreateNavigationContext = function() {
    const [headerText, setHeaderText] = useState("Вход в аккаунт");
    const [mainBlock, setMainBlock] = useState('login');
    const [index, setIndex] = useState(null);    

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