import React from "react";
import { useCreateMainBlockAnimationContext } from "./MainBlockAnimationContext";

const Context = React.createContext(null);

export const MainBlockAnimationProvider = ({ children, ...props }) => {
    const context = useCreateMainBlockAnimationContext(props);
    return <Context.Provider value={context}>
        {children}
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту пользователя
export function useMainBlockAnimationContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use main block animation context within provider');
    }
    return context;
}