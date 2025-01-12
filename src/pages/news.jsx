import Layout from "@/layouts/layout";
import {useContext, useEffect, useState} from "react";
import {GetNewsByID} from "@/utils/fetch/fetchActions";
import {useParams} from "react-router-dom";
import NewsCard from "@/partials/news/newsCard";
import CommentCard from "@/partials/news/commentCard";
import {UserContext} from "@/context/userContext";
import {useTranslation} from "react-i18next";
import useCustomToast from "@/components/forms/toast";
import {Skeleton} from "@nextui-org/react";

export default function News() {
    const {t} = useTranslation()
    const {session} = useContext(UserContext);
    const {id} = useParams();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const {showToast} = useCustomToast();

    useEffect(() => {
        setLoading(true);
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

    return (<Layout>
        {loading ? (<div className="flex flex-col min-h-[32vh] space-y-4">
            <Skeleton
                className="news-container bg-customBg rounded-lg border border-customBrown p-8 text-white shadow-lg min-h-[30vh] flex flex-col "></Skeleton>
            <Skeleton className="news-comments-container mt-6 bg-customBg rounded-lg border border-customBrown p-6 text-white shadow-lg min-h-[20vh]"></Skeleton>

        </div>) : (<>
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
            showToast={showToast}
        />
        </>)}
            </Layout>);
}
