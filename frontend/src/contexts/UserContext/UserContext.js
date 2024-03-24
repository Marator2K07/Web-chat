import { useCallback, useState } from "react"

export const useCreateUserContext = function(props) {
    // если не передадим в провайдере значение, то умолчанию null 
    const [user, setUser] = useState(props.user || null);
    const [aboutUser, setAboutUser] = useState(null);
    const [rooms, setRooms] = useState(null);   
    const [roomForNews, setRoomForNews] = useState(null);

    const loadUser = useCallback((user) => {
        setUser(user);
    }, []);

    const loadAboutUser = useCallback((aboutUser) => {
        setAboutUser(aboutUser);
    }, []);

    const loadRooms = useCallback((rooms) => {
        setRooms(rooms);
        setRoomForNews(rooms.filter(room => room['for_news'] === true)[0]);
    }, []);

    return { user,
             aboutUser,
             rooms,
             roomForNews,
             loadUser,
             loadAboutUser,
             loadRooms };
}