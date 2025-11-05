
import axios from "axios";
const SERVER_URI = "http://localhost:8000";

const api = axios.create({
    baseURL: SERVER_URI,
    withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
    (response)=>response,
    async(error) =>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && isRefreshing && !originalRequest._retry)
        {
            originalRequest._retry = true;
            isRefreshing = true;
            try{
                await api.post("/api/v1/refresh");
                isRefreshing = false;
                return api(originalRequest);
            }
            catch(error)
            {
                isRefreshing= false;
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);


export default api;