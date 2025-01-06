import {createContext, useState, useEffect} from 'react';
import {useTranslation} from "react-i18next";
import {CheckSession, Logout} from "@/utils/fetch/fetchActions";
import useCustomToast from "@/components/forms/toast";


const UserContext = createContext(undefined);

const UserProvider = ({children}) => {
    const {t} = useTranslation();
    const { showToast } = useCustomToast();

    const [session, setSession] = useState(() => {
        const storedSession = localStorage.getItem('auth.message');
        return storedSession ? JSON.parse(storedSession) : null;
    });

    const [loading, setLoading] = useState(true);

    const updateSession = (data) => {
        const permissions = gmLevels[data?.access?.security_level] || gmLevels[0];
        const sessionData = {...data, account_permissions: permissions};
        setSession(sessionData);
        localStorage.setItem('auth.message', JSON.stringify(sessionData));
    };

    const player = t("Access.Player");
    const moderator = t("Access.Moderator");
    const jrgm = t("Access.JrGm");
    const gm = t("Access.Gm");
    const administrator = t("Access.Administrator");

    const gmLevels = {
        0: player, 1: moderator, 2: jrgm, 3: gm, 4: administrator,
    };

    const logout = async () => {
        try {
            const response = await Logout();
            if (response.ok) {
                setSession(null);
                localStorage.removeItem('auth.message');
            }
        } catch (error) {
            showToast('Error while loading data');
        }
    };

    const checkSession = async () => {
        if (!session) {
            setLoading(false);
            return;
        }
        try {
            const res = await CheckSession();
            if (res.status === 200) {
                const data = await res.json();
                updateSession(data.data);
            } else {
                logout();
            }
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkSession();
    }, []);

    return (
        <UserContext.Provider value={{session, updateSession, logout, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider};
