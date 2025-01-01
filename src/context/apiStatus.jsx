import { createContext, useState, useEffect, useContext } from 'react';
import {CheckLive} from "@/utils/fetch/fetchActions";

const ApiStatus = createContext();

export const ApiStatusProvider = ({ children }) => {
    const [isApiAvailable, setIsApiAvailable] = useState(true);

    useEffect(() => {
        const checkApiStatus = async () => {
            try {
                const response = await CheckLive();
                if (!response.ok)
                setIsApiAvailable(true);
            } catch (error) {
                setIsApiAvailable(false);
            }
        };

        checkApiStatus();
        const interval = setInterval(checkApiStatus, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ApiStatus.Provider value={{ isApiAvailable }}>
            {children}
        </ApiStatus.Provider>
    );
};

export const useApiStatus = () => useContext(ApiStatus);
