import {UserProvider} from "./context/UserContext";
import AppRouter from "@/routes/appRouter";
import {ApiStatusProvider} from "@/context/apiStatus";
import useCustomToast from "@/components/forms/toast";

export default function App() {
    const { ToastWrapper } = useCustomToast();

    return (
        <ApiStatusProvider>
            <UserProvider>
                <AppRouter/>
                <ToastWrapper/>
            </UserProvider>
        </ApiStatusProvider>
    );
}
