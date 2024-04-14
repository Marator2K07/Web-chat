import { useCallback, useState } from "react"
import { useMainBlockAnimationContext } from "../MainBlockAnimationContext/MainBlockAnimationProvider";
import { EXTRA_SHORT_DELAY } from "../../constants";
import { cookies } from "../CookieContext";

export const useCreateNavigationContext = function() {   
    const [navigationBlocks] = useState({
        initBlock: { path: 'init', description: '', index: -1 },
        loginBlock: { path: 'login', description: 'Вход в аккаунт', index: 0 },
        registerBlock: { path: 'register', description: 'Регистрация', index: 1 },
        welcomeBlock: { path: 'welcome', description: 'Добро пожаловать', index: 2 },
        personalBlock: { path: 'personal', description: 'Личная страница', index: 3 },
        communicationBlock: { path: 'communication', description: 'Общение', index: 4 },
        newsBlock: { path: 'news', description: 'Новости', index: 5 },
        otherUserBlock: { path: 'otherUser', description: 'Другой пользователь', index: 11 }
    }) 
    const { initCondition, leftCondition, rightCondition } = useMainBlockAnimationContext();
    const [currentBlock, setCurrentBlock] = useState(navigationBlocks.initBlock);
    const goNavigation = useCallback((block) => {
        setCurrentBlock(block);   
        // запоминаем последний блок в навигации
        if (block.index <= 1) {
            cookies.set('lastBeforeLoginBlock', block);
        } else {
            cookies.set('lastAfterLoginBlock', block);
        }      
    }, []);

    const goNavigationWithAnimation = useCallback((block) => {
        currentBlock.index < block.index ? leftCondition()
                                         : rightCondition();
        setTimeout(() => {
            setCurrentBlock(block);
            currentBlock.index < block.index ? rightCondition() 
                                             : leftCondition();
            setTimeout(() => {
                initCondition();
            }, EXTRA_SHORT_DELAY);
        }, EXTRA_SHORT_DELAY);  
        // запоминаем последний блок в навигации
        if (block.index <= 1) {
            cookies.set('lastBeforeLoginBlock', block);
        } else {
            cookies.set('lastAfterLoginBlock', block);
        }   
    }, [
        currentBlock.index,
        initCondition,
        leftCondition,
        rightCondition
    ]);

    return { currentBlock,
             navigationBlocks,
             goNavigation,
             goNavigationWithAnimation };
}