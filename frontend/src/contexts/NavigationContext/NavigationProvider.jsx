import React from "react";
import { useCreateNavigationContext } from "./NavigationContext";

const Context = React.createContext(null);

export const NavigationProvider = ({ children, ...props }) => {
    const context = useCreateNavigationContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к перехода между main блоками
export function useNavigationContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use navigation context within provider');
    } 
    return context;
}