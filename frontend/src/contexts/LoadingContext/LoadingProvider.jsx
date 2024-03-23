import React from "react";
import { useCreateLoadingContext } from "./LoadingContext";

const Context = React.createContext(null);

export const LoadingProvider = ({ children, ...props }) => {
    const context = useCreateLoadingContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту загрузки
export function useLoadingContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use loading context within provider');
    } 
    return context;
}