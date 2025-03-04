import {useContext, useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {authRoutes, publicRoutes} from "@/routes/routes";
import {UserContext} from "@/context/userContext";
import Maintenance from "@/pages/maintenance";
import {useApiStatus} from "@/context/apiStatus";
import NotFound from "@/pages/notFound";

export default function AppRouter() {
    const location = useLocation();
    const {session, currentUser} = useContext(UserContext);
    const { isApiAvailable } = useApiStatus();

    if (!isApiAvailable) {
        return <Maintenance />;
    }

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        window.scroll({top: 0});
        document.querySelector('html').style.scrollBehavior = '';
    }, [location.pathname]);

    return (<>
            <Routes>
                {session && authRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>} exact/>))}
                {publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>} exact/>))}
                <Route path="*" element={<NotFound></NotFound>}/>
            </Routes>
        </>);
}
