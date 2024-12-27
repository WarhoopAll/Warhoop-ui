import Home from "../pages/home";
import News from "../pages/news";

export const publicRoutes = [
    // {
    //     path: '*',
    //     Component: NotFound
    // }
    {
        path: '/',
        Component: Home
    },
    {
        path: '/news-post/:id',
        Component: News
    }
]
export const authRoutes = [
    // {
    //     path: '/',
    //     Component: MainPage
    // }
    // {
    //     path: '*',
    //     Component: NotFound
    // }
]