import { useEffect, useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { Image } from "@nextui-org/image";
import { Tooltip, Button } from "@nextui-org/react";
import ReactionButton from "@/components/forms/ReactionButton";
import CommentReply from "@/partials/news/comment";
import { FaEdit } from "@react-icons/all-files/fa/FaEdit";
import ReportButton from "@/components/forms/reportButton";
import processTextWithTooltips from "@/hook/useWoWDBLinks;";

export default function CommentCard({ comments, addComment, deleteComment, session, t, showToast }) {
    const [editMode, setEditMode] = useState(null);
    const [processedComments, setProcessedComments] = useState([]);

    useEffect(() => {
        const processed = comments.map((comment) => ({
            ...comment,
            processedText: processTextWithTooltips(comment?.text),
        }));

        setProcessedComments(processed);

        setTimeout(() => {
            if (window.$WowheadPower) {
                window.$WowheadPower.refreshLinks();
            }
        }, 300);
    }, [comments]);

    const handleEditClick = (comment) => {
        setEditMode(comment.id);
    };

    const handleCancelEdit = () => {
        setEditMode(null);
    };

    return (
        <div className="news-comments-container mt-6 bg-customBg rounded-lg border border-customBrown p-6 text-white shadow-lg animate-fadeIn">
            <h2 className="text-2xl font-bold mb-6">{t("Comments")}</h2>
            <CommentReply addComment={addComment} session={session} t={t} showToast={showToast} />

            {processedComments.length > 0 ? (
                processedComments.map((comment) => {
                    const isUpdated = comment.updated_at && comment.updated_at !== comment.created_at;
                    const isAuthor = session?.profile?.id === comment.profile?.id;

                    return (
                        <div key={comment.id} className="news-comment-item p-4 border border-customBrown pb-6 mb-6 flex flex-col rounded-lg relative">
                            <div className="news-header mb-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src={comment.profile?.avatar}
                                        alt={comment.profile?.name}
                                        className="w-12 h-12 rounded-full shadow-2xl"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-red-400 font-bold text-lg mb-1">
                                            {comment.profile?.name}
                                        </span>
                                        {isUpdated ? (
                                            <span className="text-gray-500 text-sm">
                                                {t("ChangeComment")} {formatDate(comment.updated_at)}
                                            </span>
                                        ) : (
                                            <span className="text-gray-500 text-sm">
                                                {formatDate(comment.created_at)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {isAuthor && editMode !== comment.id && (
                                    <Tooltip content={t("Edit")} showArrow={true}>
                                        <Button
                                            size="sm"
                                            onPress={() => handleEditClick(comment)}
                                            className="buttonClose"
                                        >
                                            <FaEdit size={18} />
                                        </Button>
                                    </Tooltip>
                                )}
                            </div>

                            {editMode === comment.id ? (
                                <CommentReply
                                    initialValue={comment.text}
                                    isEditing={true}
                                    commentId={comment.id}
                                    addComment={addComment}
                                    onCancel={handleCancelEdit}
                                    session={session}
                                    deleteComment={deleteComment}
                                    t={t}
                                    showToast={showToast}
                                />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{ __html: comment?.processedText }}
                                    className="news-content leading-relaxed text-md text-gray-300 flex-grow mb-6 break-words whitespace-pre-wrap"
                                ></div>
                            )}

                            <div className="news-footer">
                                <div className="font-semibold flex items-center text-sm text-gray-400 border-t border-customBrown">
                                    <ReactionButton
                                        objectId={comment?.id}
                                        objectType={2}  // 2 = Comment
                                        initialLikes={comment?.like_count}
                                        initialDisLikes={comment?.dislike_count}
                                        session={session}
                                        showToast={showToast}
                                    />
                                    <div className="font-semibold text-sm text-gray-400 ml-2">
                                        <ReportButton
                                            objectId={comment?.id}
                                            objectType={2}  // 2 = Comment
                                            victim={comment?.profile?.id}
                                            session={session}
                                            showToast={showToast}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="text-center text-gray-400">{t("CommSoFar")}</p>
            )}
        </div>
    );
}
