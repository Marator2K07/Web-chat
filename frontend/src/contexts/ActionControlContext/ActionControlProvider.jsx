import React from "react";
import { useCreateActionControlContext } from "./ActionControlContext";

const Context = React.createContext(null);

export const ActionControlProvider = ({ children, ...props }) => {
    const context = useCreateActionControlContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту контроля за действиями
export function useActionControlContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use action control context within provider');
    } 
    return context;
}