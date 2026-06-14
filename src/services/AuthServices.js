import axios from "axios";
import { BaseUrl } from "../../env.config";

export const login = async (email, password) => {
    
    const response = await axios.post(`${BaseUrl}/login/`, {
    email,
    password
});

    const {access, refresh, user} = response.data;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));

    localStorage.setItem("login_time", Date.now());

    return response.data;
};

export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user")
}