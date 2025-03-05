import ReactDOM from "react-dom/client";
import App from "@/app";
import I18nLoader from "@/utils/i18n/I18nLoader";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <I18nLoader>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </I18nLoader>
);
