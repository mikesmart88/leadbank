import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (alert) => {
        setAlert(alert);
    };

    const clearAlert = () => {
        console.log('alert cleard')
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
            {children}
        </AlertContext.Provider>
    );
};
