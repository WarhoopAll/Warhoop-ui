import Home from "../pages/home";
import News from "../pages/news";
import Online from "@/pages/online";

export const publicRoutes = [
    {
        path: '/online',
        Component: Online
    },
    {
        path: '/',
        Component: Home
    },
    {
        path: '/page/:pageNumber',
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