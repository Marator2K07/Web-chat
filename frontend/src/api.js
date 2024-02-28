import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// в каждый запрос мы спомощью перехватчика интегрируем ключ
api.interceptors.request.use(
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
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // условие ниже эквивалентно истечению срока ключа (токена)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;            
            try {
                // пытаемся получить новый ключ
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post(`${api.baseURL}/refresh-token`, {refreshToken});
                const { token } = response.data;
                localStorage.setItem('token', token);
                // с новым ключом повторяем предыдущих запрос 
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                // место будущей обработки ошибки 
            }            
        }
        return Promise.reject(error);
    }
)

export default api;