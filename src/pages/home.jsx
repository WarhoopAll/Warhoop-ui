import {useEffect, useState} from 'react';
import Layout from "@/layouts/layout";
import {GetNews} from "@/utils/fetch/fetchActions";
import NewsCardList from "@/partials/news/newsCardList";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 2;
    const fetchData = async () => {
        setLoading(true);
        let offset = (currentPage * limit) - limit;

        try {
            const response = await GetNews(limit, offset);
            const data = await response.json();
            const url = `news?limit=${limit}&offset=${offset}`;

            setArticles(data?.data || []);
            setTotalPage(Math.ceil(data?.total / limit));
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const watchPage = (page) => {
        setCurrentPage(page);
    };

    return (<Layout
        welcome={true}
        status={true}
        footer={true}>
        {loading ? (<div className="flex justify-center items-center my-10">
            <div className="custom-spinner"></div>
        </div>) : (<NewsCardList props={{currentPage, totalPage, watchPage, loading , articles}}/>)}
    </Layout>);
}