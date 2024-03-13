import React from "react";
import { useCreateUserContext } from "./UserContext";

const Context = React.createContext(null);

export const UserContextProvider = ({ children, ...props }) => {
    const context = useCreateUserContext(props);
    return <Context.Provider value={ context }>
        { children }
    </Context.Provider>;
};

// определяем свой веб хук для доступа к контексту пользователя
export function useUserContext() {
    const context = React.useContext(Context);
    if (!context) {
        throw new Error('Use user provider within provider');
    } 
    return context;
}