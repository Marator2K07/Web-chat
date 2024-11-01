import React from "react";
import { useCreateScrollContext } from "./ScrollContext";

const Context = React.createContext(null);

export const ScrollProvider = ({ children, ...props }) => {
    const context = useCreateScrollContext(props);
    return <Context.Provider value={context}>
        {children}
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту прокрутки
export function useScrollContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use scroll context within provider');
    }
    return context;
}