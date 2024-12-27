import {useEffect, useState} from 'react';
import Layout from "@/layouts/layout";
import NewsMin from "@/partials/news/newsMin";
import Pagination from "@/components/features/pagination";
import {GetNews} from "@/utils/fetch/fetchActions";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await GetNews();
            const data = await response.json();

            setArticles(data?.data || []);
            setTotalPage(data?.totalPage || 1);
        } catch (error) {
            console.error("Error loading news:", error);
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
        </div>) : (<NewsMin props={{currentPage, articles}}/>)}
        {!totalPage > 1 && (<Pagination props={{watchPage, totalPage, currentPage}}/>)}
    </Layout>);
}