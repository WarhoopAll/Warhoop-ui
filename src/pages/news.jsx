import Layout from "@/layouts/layout";
import {useContext, useEffect, useState} from "react";
import {GetNewsByID} from "@/utils/fetch/fetchActions";
import {useParams} from "react-router-dom";
import NewsCard from "@/partials/news/newsCard";
import CommentCard from "@/partials/news/commentCard";
import {UserContext} from "@/context/userContext";
import {Button} from "@nextui-org/react";
import {useTranslation} from "react-i18next";

export default function News() {
    const {t} = useTranslation()
    const {session} = useContext(UserContext);
    const {id} = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            GetNewsByID(id)
                .then((response) => response.json())
                .then((data) => {
                    if (data?.status === 'success') {
                        setNews(data?.data);
                        setComments(data?.data?.comments || []);
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    const updateNews = (updatedNews) => {
        setNews((prev) => ({...prev, ...updatedNews}));
    };

    const addComment = (newComment) => {
        setComments((prevComments) => prevComments.some((c) => c.id === newComment.id) ? prevComments.map((c) => (c.id === newComment.id ? newComment : c)) : [newComment, ...prevComments]);
    };

    const deleteComment = (commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
    };

    if (loading) {
        return (<Layout>
                <div className="news-container animate-fadeIn">
                    <h1>Loading...</h1>
                </div>
            </Layout>);
    }

    return (<Layout>
            <NewsCard
                news={news}
                session={session}
                updateNews={updateNews}
                t={t}
            />
            <CommentCard
                comments={comments}
                addComment={addComment}
                deleteComment={deleteComment}
                session={session}
                t={t}
            />
        </Layout>);
}
