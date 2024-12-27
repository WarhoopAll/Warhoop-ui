import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import I18nLoader from "@/utils/i18n/I18nLoader";
import {UserProvider} from "@/context/userContext";
import App from "@/app";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <I18nLoader>
            <NextUIProvider>
                <App/>
            </NextUIProvider>
        </I18nLoader>
    </UserProvider>
);
