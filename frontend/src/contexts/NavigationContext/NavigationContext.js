import { useCallback, useState } from "react"
import { useMainBlockAnimationContext } from "../MainBlockAnimationContext/MainBlockAnimationProvider";
import { EXTRA_SHORT_DELAY } from "../../constants";

export const useCreateNavigationContext = function() {   
    const [navigationBlocks] = useState({
        loginBlock: {path: 'login', description: 'Вход в аккаунт', index: 0},
        registerBlock: {path: 'register', description: 'Регистрация', index: 1},
        welcomeBlock: {path: 'welcome', description: 'Добро пожаловать', index: 2},
        personalBlock: {path: 'personal', description: 'Личная страница', index: 3},
        communicationBlock: {path: 'communication', description: 'Общение', index: 4},
        newsBlock: {path: 'news', description: 'Новости', index: 5},
        otherUserBlock: {path: 'otherUser', description: 'Другой пользователь', index: 11}
    }) 
    const {initCondition, leftCondition, rightCondition} = useMainBlockAnimationContext();
    const [headerText, setHeaderText] = useState('Вход в аккаунт');
    const [mainBlock, setMainBlock] = useState('login');
    const [index, setIndex] = useState('0');   

    const goNavigation = useCallback((key) => {
        setHeaderText(navigationBlocks[key].description);
        setMainBlock(navigationBlocks[key].path);
        setIndex(navigationBlocks[key].index);
    }, [navigationBlocks]);

    const goNavigationWithAnimation = useCallback((key) => {
        index < navigationBlocks[key].index ? leftCondition()
                                            : rightCondition();
        setTimeout(() => {
            setHeaderText(navigationBlocks[key].description);
            setMainBlock(navigationBlocks[key].path);
            setIndex(navigationBlocks[key].index);
            index < navigationBlocks[key].index ? rightCondition() 
                                                : leftCondition();
            setTimeout(() => {
                initCondition();
            }, EXTRA_SHORT_DELAY);
        }, EXTRA_SHORT_DELAY);  
    }, [
        navigationBlocks,
        index,
        initCondition,
        leftCondition,
        rightCondition
    ]);

    return { headerText,
             mainBlock,
             index,
             navigationBlocks,
             goNavigation,
             goNavigationWithAnimation };
}