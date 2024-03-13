import axios from "axios";

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
        const token = localStorage.getItem('token');
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
                console.log('lol');
                // пытаемся получить новый ключ
                const refreshToken = localStorage.getItem('refreshToken');                
                const token = await WebChatClient.post('/api/token/refresh', {refreshToken});
                localStorage.setItem('token', token);
                // с новым ключом повторяем предыдущий запрос 
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return WebChatClient(originalRequest);
            } catch (errorInner) {
                console.log(errorInner);
            }            
        }       
        return Promise.reject(error);
    }
)

export default WebChatClient;