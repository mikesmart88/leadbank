import { createContext, useState, useEffect } from "react";
import * as authService from '../services/AuthServices';
import { useAlert } from "./AlertContext";
import api from "../services/Api";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { showAlert } = useAlert();
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ loading state

    const navigate = useNavigate()

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("access_token");

            if (!token || !storedUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                // Validate session with backend
                const res = await api.get("/check-session/");
                setUser(res.data.user); // ✅ only set if session is valid
            } catch (err) {
                authService.logout();
                setUser(null);
                navigate("/login/")
            } finally {
                setLoading(false); // ✅ auth check complete
            }
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            setUser(response.user);
            return response;
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        return true;
    };

    const IsAuthenticated = !!User;

    return (
        <AuthContext.Provider value={{ User, login, logout, IsAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
