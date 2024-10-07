import React from "react";
import { useCreateTipsContext } from "./TipsContext";

const Context = React.createContext(null);

export const TipsProvider = ({ children, ...props }) => {
    const context = useCreateTipsContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту пользователя
export function useTipsContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use tips context within provider');
    } 
    return context;
}