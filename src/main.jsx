import ReactDOM from 'react-dom/client';
import {NextUIProvider} from "@nextui-org/react";
import I18nLoader from "@/utils/i18n/I18nLoader";
import {UserProvider} from "@/context/userContext";
import App from "@/app";
import {ApiStatusProvider} from "@/context/apiStatus";

ReactDOM.createRoot(document.getElementById('root')).render(
        <UserProvider>
            <I18nLoader>
                <NextUIProvider>
                    <ApiStatusProvider>
                        <App/>
                    </ApiStatusProvider>
                </NextUIProvider>
            </I18nLoader>
        </UserProvider>
);
