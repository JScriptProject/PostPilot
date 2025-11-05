
import axios from "axios";
const SERVER_URI = "http://localhost:8000";

const api = axios.create({
    baseURL: SERVER_URI,
    withCredentials: true,
});

api.interceptors.response.use(
    (response)=>response,
    async(error) =>{
        const originalRequest = error.config;
        if(originalRequest.url.includes("/refresh")){
            return Promise.reject(error);
        }
        if(error.response?.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true;
            try {
                await api.post("/api/v1/refresh");
                return api(originalRequest);
            } catch (error) {
                console.log("Token refresh failed", error);
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);


export default api;