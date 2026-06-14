import axios from "axios";
import { BaseUrl } from "../../env.config";

const api = axios.create({
    baseURL: BaseUrl,
    headers: {
         "Content-Type": "application/json",
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.clear();

            window.dispatchEvent(
                new CustomEvent("session-expired", {
                    detail: "Session expired. Please login again.",
                })
            );
        }
        return Promise.reject(error);
    }
);

export default api;
