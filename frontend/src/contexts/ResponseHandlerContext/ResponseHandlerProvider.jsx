import React from "react";
import { useCreateResponseHandlerContext } from "./ResponseHandlerContext";

const Context = React.createContext(null);

export const ResponseHandlerProvider = ({ children, ...props }) => {
    const context = useCreateResponseHandlerContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту пользователя
export function useResponseHandlerContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use response provider within provider');
    } 
    return context;
}