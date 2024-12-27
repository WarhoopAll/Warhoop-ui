import {useContext, useEffect, useState} from 'react';
import DOMPurify from "dompurify";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {CreateComment, DeleteComment, GetNewsByID, UpdateComment} from "@/utils/fetch/fetchActions";
import {UserContext} from "@/context/userContext.jsx";
import Layout from "@/layouts/layout";
import {formatDate} from "@/utils/formatDate";

export default function News() {
    const {isAuth, session} = useContext(UserContext);
    const [data, setData] = useState({});
    const [commentsLimit, setCommentsLimit] = useState(10);
    const [isLoading, setLoading] = useState(true);
    const {id} = useParams();
    const newsId = parseInt(id, 10);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    const handleCommentChange = (e) => {
        const sanitizedComment = DOMPurify.sanitize(e.target.value);
        setNewComment(sanitizedComment);
        setError("");
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!isAuth) {
            toast.error("You must log in to comment.");
            return;
        }

        if (newComment.trim().length < 10 || newComment.length > 1000) {
            toast.error("Comment must be between 10 and 1000 characters.");
            return;
        }

        const uniqueChars = new Set(newComment.trim());
        if (uniqueChars.size < 5) {
            toast.error("Comment must contain at least 5 unique characters.");
            return;
        }

        try {
            const body = {news_id: newsId, text: newComment};

            const response = await CreateComment(body);

            if (response.status === 200) {
                const responseData = await response.json();
                const newCommentData = responseData?.data;

                if (newCommentData) {
                    toast.success("Comment successfully submitted.");
                    setNewComment("");

                    setData((prevData) => ({
                        ...prevData, comments: [newCommentData, ...(prevData.comments || [])],
                    }));
                } else {
                    toast.error("Failed to parse the comment response.");
                }
            } else {
                toast.error("Failed to submit the comment.");
            }
        } catch (error) {
            toast.error("An error occurred while submitting the comment.");
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await GetNewsByID(newsId);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData(jsonData?.data || {});
            } catch (error) {
                toast.error("Error fetching news: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [newsId]);


    const loadMoreComments = () => {
        setCommentsLimit((prevLimit) => prevLimit + 10);
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            try {
                const response = await DeleteComment(commentId);

                if (response.ok) {
                    setData((prevData) => ({
                        ...prevData, comments: prevData.comments.filter((comment) => comment.id !== commentId),
                    }));
                } else {
                    toast.error("Failed to delete the comment. Please try again.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    const [editedCommentId, setEditedCommentId] = React.useState(null);
    const [editedText, setEditedText] = React.useState("");

    const startEdit = (id, text) => {
        setEditedCommentId(id);
        setEditedText(text);
    };

    const cancelEdit = () => {
        setEditedCommentId(null);
        setEditedText("");
    };

    const handleSaveComment = async (id) => {
        try {
            const body = {id: id, text: editedText};
            const response = await UpdateComment(body);
            if (response.ok) {
                setData((prevData) => ({
                    ...prevData, comments: prevData.comments.map((comment) => comment.id === id ? {
                        ...comment, text: editedText
                    } : comment),
                }));
                cancelEdit();
            } else {
                toast.error("Failed to update the comment. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (<Layout status={true} footer={true} welcome={true}>
        <div className="p-4 shadow-lg rounded-md border border-customBrown bg-customBg">
            {isLoading ? (<div className="flex justify-center items-center my-10">
                    <div className="custom-spinner"></div>
                </div>) : (<div className="p-4 shadow-lg">
                    <h1 className="text-2xl md:text-3xl text-customTXT font-bold">
                        {data?.title}
                    </h1>
                    <div className="flex flex-wrap mt-4">
                        <div
                            className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                            <div className="font-medium text-red-700">
                                {data?.profile?.name}
                            </div>
                        </div>
                        <div
                            className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                            <div className="text-slate-500">{formatDate(data?.created_at)}</div>
                        </div>
                        <div
                            className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">

                            <div className="text-slate-500">{data?.comments_count} Comments</div>
                        </div>
                        <div
                            className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                            <div className="text-slate-500">{data?.like_count} Likes</div>
                        </div>

                    </div>
                    <div
                        className="mt-8"
                        dangerouslySetInnerHTML={{__html: data?.text}}
                    ></div>
                    <div className="mt-8">
                        {!isAuth ? (<div className="w-full  text-[#e0e0e0] p-3 rounded-md text-center">
                                Log in to Comment
                            </div>) : (<form
                                onSubmit={handleCommentSubmit}
                                className="bg-[#1f1f1f] p-4 rounded-lg shadow-md border border-[#3b3b3b] mb-8"
                            >
                                <h2 className="text-lg font-bold text-[#f3f3f3] mb-3">Comment:</h2>
                                <textarea
                                    id="comment"
                                    placeholder="Write your comment..."
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    className="w-full bg-[#1f1f1f] text-[#e0e0e0] p-3 rounded-md border border-[#3b3b3b] focus:outline-none focus:border-[#b08d57] transition"
                                    rows="4"
                                ></textarea>
                                <button
                                    type="submit"
                                    className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:opacity-80 hover:bg-indigo-600 transition"
                                >
                                    Submit Comment
                                </button>
                            </form>)}
                        <ul className="space-y-6 mt-6">
                            {(data.comments || []).slice(0, commentsLimit).map((comment) => (<li
                                    key={comment.id}
                                    className="relative p-4 rounded-md shadow-md"
                                >
                                    {session?.access?.security_level > 0 && (<button
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="absolute top-2 right-8 text-[#e55454] hover:text-[#ff6666] transform transition-all duration-200 hover:scale-110 hover:rotate-12"
                                            title="Delete comment"
                                        >
                                            🗑️
                                        </button>)}
                                    <div className="flex items-start space-x-4">
                                        <div className="flex flex-col items-center">
                                            <img
                                                className="rounded-full"
                                                src={comment?.profile?.avatar || "/assets/avatar/default.png"}
                                                width="50"
                                                height="50"
                                                alt="User Avatar"
                                            />
                                            <div className="flex items-center space-x-2 mt-2 text-sm">
                                                    <span
                                                        className="text-[#e0e0e0]">{comment?.profile?.rank || "undifened"}</span>
                                            </div>
                                            <div className="flex items-center space-x-2 mt-12 text-sm">
                                                <button
                                                    onClick={() => handleLike(comment.id)}
                                                    className="text-gray-500 hover:text-blue-500 transform transition-all duration-200 hover:scale-110"
                                                    title="Like"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         strokeWidth="1.5"
                                                         stroke="currentColor"
                                                         className="size-6">
                                                        <path strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"/>
                                                    </svg>
                                                </button>
                                                <span className="text-[#e0e0e0]">{comment?.like_count || 0}</span>
                                                <button
                                                    onClick={() => handleDislike(comment?.id)}
                                                    className="text-gray-500 hover:text-red-500 transform transition-all duration-200 hover:scale-110"
                                                    title="Dislike"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         strokeWidth="1.5"
                                                         stroke="currentColor"
                                                         className="size-6">
                                                        <path strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-4">
                                                <p className="font-semibold text-[#f3f3f3]">
                                                    {comment?.profile?.name || "Anonymous"}
                                                </p>
                                                <p className="text-sm text-[#999999]">
                                                    {new Date(comment?.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div
                                                className="bg-[#2a2a2a] text-[#e0e0e0] p-3 rounded-md border border-[#3b3b3b]">
                                                {editedCommentId === comment?.id ? (<textarea
                                                        value={editedText}
                                                        onChange={(e) => setEditedText(e.target.value)}
                                                        className="w-full bg-[#1f1f1f] text-[#e0e0e0] p-3 rounded-md border border-[#3b3b3b] focus:outline-none focus:border-[#b08d57] transition"
                                                        rows="4"
                                                    />) : (<p style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
                                                        {comment.text}
                                                    </p>)}
                                            </div>
                                        </div>
                                    </div>
                                    {(session?.access?.security_level < 1 || session?.profile?.name === comment?.profile?.name) && (
                                        <div className="mt-8">
                                            {editedCommentId === comment.id ? (<div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleSaveComment(comment.id)}
                                                        className="bg-indigo-200 text-white py-1 px-3 rounded-md hover:opacity-80 hover:bg-[#e5e7eb]"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={cancelEdit}
                                                        className="bg-indigo-200 text-white py-1 px-3 rounded-md hover:opacity-80 hover:bg-[#e5e7eb]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    {(session?.profile?.id === comment?.profile?.id) && (<button
                                                            onClick={() => handleDeleteComment(comment.id)}
                                                            className="bg-indigo-200 text-white py-1 px-3 rounded-md hover:opacity-80 hover:bg-[#e5e7eb] focus:bg-default/40"
                                                            title="Delete comment"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="size-6">
                                                                <path strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                                                            </svg>

                                                        </button>)}
                                                </div>) : (<button
                                                    onClick={() => startEdit(comment.id, comment.text)}
                                                    className="absolute top-2 right-2 text-[#e55454] hover:text-[#ff6666] transform transition-all duration-200 hover:scale-110"
                                                    title="Edit comment"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         fill="none" viewBox="0 0 24 24"
                                                         strokeWidth="1.5"
                                                         stroke="currentColor"
                                                         className="size-6">
                                                        <path strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                                                    </svg>
                                                </button>)}
                                        </div>)}
                                </li>))}
                        </ul>

                        {(data.comments || []).length > commentsLimit && (<button
                                onClick={loadMoreComments}
                                className="mt-4  bg-[#e55454] text-white py-2 px-4 rounded-md hover:bg-[#ff6666] transition"
                            >
                                Load More Comments
                            </button>)}
                    </div>

                </div>)}
        </div>

    </Layout>);
}