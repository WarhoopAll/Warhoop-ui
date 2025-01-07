import Layout from "@/layouts/layout";
import { useEffect, useState } from "react";
import { GetNewsByID } from "@/utils/fetch/fetchActions";
import { useParams } from "react-router-dom";
import NewsCard from "@/partials/news/newsCard";
import CommentCard from "@/partials/news/commentCard";

export default function News() {
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            GetNewsByID(id)
                .then((response) => response.json())
                .then((data) => {
                    if (data?.status === 'success') {
                        setNews(data?.data);
                        setComments(data?.data?.comments || []);
                    } else {
                        setError('Error loading news');
                    }
                })
                .catch(() => setError('Error loading news'))
                .finally(() => setLoading(false));
        }
    }, [id]);

    const addComment = (newComment) => {
        console.log("New comment", newComment);

        setComments((prev) => [newComment, ...prev])
    };

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
            <CommentCard comments={comments} addComment={addComment} />
        </Layout>
    );
}
