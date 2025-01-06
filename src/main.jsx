import ReactDOM from 'react-dom/client';
import { NextUIProvider } from "@nextui-org/react";
import I18nLoader from "@/utils/i18n/I18nLoader";
import { UserProvider } from "@/context/userContext";
import App from "@/app";
import { ApiStatusProvider } from "@/context/apiStatus";
import useCustomToast from "@/components/forms/toast";

const Root = () => {
    const { ToastWrapper } = useCustomToast();

    return (
        <UserProvider>
            <I18nLoader>
                <NextUIProvider>
                    <ApiStatusProvider>
                        <App />
                        <ToastWrapper />  {/* Этот компонент добавляет ToastContainer в DOM */}
                    </ApiStatusProvider>
                </NextUIProvider>
            </I18nLoader>
        </UserProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <Root />
);
