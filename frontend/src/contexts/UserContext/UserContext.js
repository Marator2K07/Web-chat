import { useCallback, useState } from "react"

export const useCreateUserContext = function(props) {
    // если не передадим в провайдере значение, то умолчанию null 
    const [user, setUser] = useState(props.user || null);
    const [aboutUser, setAboutUser] = useState(null);

    const loadUser = useCallback((user) => {
        setUser(user);
    }, []);

    const loadAboutUser = useCallback((aboutUser) => {
        setAboutUser(aboutUser);
    }, []);

    return { user,
             aboutUser,
             loadUser,
             loadAboutUser };
}