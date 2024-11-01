import { useCallback, useState } from "react"

export const useCreateUserContext = function (props) {
    // если не передаем в провайдере значение, то умолчанию null 
    const [user, setUser] = useState(props.user || null);
    const [bufferUser, setBufferUser] = useState(null);
    const [aboutUser, setAboutUser] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [roomForNews, setRoomForNews] = useState(null);

    const clearUserContext = useCallback(() => {
        setUser(null);
        setBufferUser(null);
        setAboutUser(null);
        setCurrentRoom(null);
        setRooms(null);
        setRoomForNews(null);
    }, []);

    const loadCurrentRoom = useCallback((room) => {
        setCurrentRoom(room)
    }, []);

    const loadUser = useCallback((user) => {
        setUser(user);
    }, []);

    const loadAboutUser = useCallback((aboutUser) => {
        setAboutUser(aboutUser);
    }, []);

    const loadBufferUser = useCallback((bufferUser) => {
        setBufferUser(bufferUser);
    }, []);

    const loadRooms = useCallback((rooms) => {
        setRooms(rooms.filter(room => room['for_news'] !== true));
        setRoomForNews(rooms.filter(room => room['for_news'] === true)[0]);
    }, []);

    return {
        user,
        aboutUser,
        bufferUser,
        rooms,
        currentRoom,
        roomForNews,
        clearUserContext,
        loadUser,
        loadAboutUser,
        loadBufferUser,
        loadCurrentRoom,
        loadRooms
    };
}