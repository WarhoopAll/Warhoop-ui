import { BrowserRouter } from 'react-router-dom';
import AppRouter from "@/routes/appRouter";
export default function App() {
    return (
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
    );
}
