import Layout from "@/layouts/layout";
import { useEffect, useState } from "react";
import {GetNewsByID} from "@/utils/fetch/fetchActions";
import {useParams} from "react-router-dom";
import NewsCard from "@/partials/news/newsCard";
import CommentCard from "@/partials/news/commentCard";

export default function News() {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            GetNewsByID(id)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data?.status === 'success') {
                        setNews(data?.data);
                    } else {
                        setError('err');
                    }
                })
                .catch(() => setError('err'))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="news-container animate-fadeIn">
                    <h1>Loading...</h1>
                </div>
            </Layout>
        );
    }


    return (
        <Layout>
            <NewsCard news={news} />
            <CommentCard comments={news?.comments} />
        </Layout>
    );
}
