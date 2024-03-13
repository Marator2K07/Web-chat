import axios from "axios";
import { cookies } from "./CookieContext";

const WebChatClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 5000,
    headers: {
        "Content-Type": 'application/json'
    }
});

// в каждый запрос мы с помощью перехватчика интегрируем ключ
WebChatClient.interceptors.request.use(
    (config) => {
        const token = cookies.get('token');
        if (token) {
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
        // если поймали "свою ошибку" то просто возращаем ее
        if (error.name === 'AxiosError') {
            throw error;
        }
        const originalRequest = error.config;
        // условие ниже эквивалентно истечению срока ключа (токена)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;            
            try {
                // пытаемся получить новый ключ
                const refreshToken = cookies.get('refreshToken');                
                const response = await WebChatClient.post('/api/token/refresh', {refreshToken});
                cookies.set('token', response.token, { maxAge: 3600 });
                // с новым ключом повторяем предыдущий запрос 
                originalRequest.headers.Authorization = `Bearer ${response.token}`;
                return WebChatClient(originalRequest);
            } catch (errorInner) {
                console.log(errorInner);
            }            
        }       
        return Promise.reject(error);
    }
)

export default WebChatClient;