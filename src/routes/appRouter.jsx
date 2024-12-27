import {useContext, useEffect} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import {authRoutes, publicRoutes} from "@/routes/routes";
import {UserContext} from "@/context/userContext";

export default function AppRouter() {
    const location = useLocation();
    const {isAuth, currentUser} = useContext(UserContext);

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto';
        window.scroll({top: 0});
        document.querySelector('html').style.scrollBehavior = '';
    }, [location.pathname]);

    return (<>
            <Toaster/>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>} exact/>))}
                {publicRoutes.map(({path, Component}) => (
                    <Route key={path} path={path} element={<Component/>} exact/>))}
                <Route path="*" element={<h1>404 Страница не найдена</h1>}/>
            </Routes>
        </>);
}
