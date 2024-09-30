import axios from "axios";
import { cookies } from "./contexts/CookieContext";
import { COOKIES_REFRESH_TOKEN, COOKIES_TOKEN, FIVE_MIN_AGE, UPDATE_STATUS_ROUTE } from "./constants";

const WebChatClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    timeout: 22222,
    headers: {
        'Content-Type': "application/json"
    }
});

// в каждый запрос мы с помощью перехватчика интегрируем ключ
WebChatClient.interceptors.request.use(
    (config) => {
        const token = cookies.get(COOKIES_TOKEN);
        if (typeof token !== "undefined") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// если срок действия ключа истек, то пытаемся получить новый
WebChatClient.interceptors.response.use(
    (response) => response,
    async (error) => {        
        const originalRequest = error.config;
        // условие ниже эквивалентно истечению срока ключа (токена)
        if (error.status === 401 &&
            !originalRequest._retry &&
            typeof cookies.get(COOKIES_REFRESH_TOKEN) !== "undefined") {
            originalRequest._retry = true;            
            try {
                // пытаемся получить новый ключ
                const refreshToken = cookies.get(COOKIES_REFRESH_TOKEN);             
                const responseInner = await WebChatClient
                    .post(UPDATE_STATUS_ROUTE, {refreshToken});
                cookies.set(COOKIES_TOKEN, responseInner.data.token, { maxAge: FIVE_MIN_AGE });
                // с новым ключом повторяем предыдущий запрос 
                originalRequest.headers.Authorization = 
                    `Bearer ${responseInner.data.token}`;
                return WebChatClient(originalRequest);
            } catch (errorInner) {
                console.log(errorInner);
            }            
        }       
        // если поймали "свою ошибку" то просто возращаем ее
        if (error.name === "AxiosError") {
            throw error;
        }
        return Promise.reject(error);
    }
)

export default WebChatClient;