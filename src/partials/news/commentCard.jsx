import {useState} from "react";
import {formatDate} from "@/utils/formatDate";
import {Image} from "@nextui-org/image";
import {Tooltip, Button} from "@nextui-org/react";
import ReactionButton from "@/components/forms/ReactionButton";
import CommentReply from "@/partials/news/comment";
import {FaEdit} from "@react-icons/all-files/fa/FaEdit";


export default function CommentCard({comments, addComment, deleteComment, session,t}) {
    const [editMode, setEditMode] = useState(null);

    const handleEditClick = (comment) => {
        setEditMode(comment.id);
    };

    const handleCancelEdit = () => {
        setEditMode(null);
    }

    return (
        <div
            className="news-comments-container mt-6 bg-customBg rounded-lg border border-customBrown p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{t("Comments")}</h2>
            <CommentReply addComment={addComment} session={session}  t={t} />
            {comments?.length > 0 ? (
                comments.map((comment) => {
                    const isUpdated = comment?.updated_at && comment?.updated_at !== comment?.created_at;
                    const isAuthor = session?.profile?.id === comment?.profile?.id;

                    return (
                        <div
                            key={comment.id}
                            className="news-comment-item p-4 border border-customBrown pb-6 mb-6 flex flex-col rounded-lg relative"
                        >
                            <div className="news-header mb-4 flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <Image
                                        src={comment?.profile?.avatar}
                                        alt={comment?.profile?.name}
                                        className="w-12 h-12 rounded-full shadow-2xl"
                                    />
                                    <div>
                                        <Tooltip content={comment?.profile?.name} showArrow={true}>
                                            <span
                                                className="text-red-400 font-bold text-lg">{comment?.profile?.name}</span>
                                        </Tooltip>
                                    </div>
                                </div>
                                {isAuthor && editMode !== comment?.id &&  (
                                    <Tooltip content={t("Edit")} showArrow={true}>
                                    <Button
                                        size="sm"
                                        onPress={() => handleEditClick(comment)}
                                        className="buttonClose"
                                    >
                                        <FaEdit  size={18} />
                                    </Button>
                                    </Tooltip>
                                )}
                            </div>
                            {editMode === comment?.id ? (
                                <CommentReply
                                    initialValue={comment.text}
                                    isEditing={true}
                                    commentId={comment.id}
                                    addComment={addComment}
                                    onCancel={handleCancelEdit}
                                    session={session}
                                    deleteComment={deleteComment}
                                    t={t}
                                />
                            ) : (
                                <div
                                    dangerouslySetInnerHTML={{__html: comment?.text}}
                                    className="news-content leading-relaxed text-md text-gray-300 flex-grow mb-6 break-words whitespace-pre-wrap"
                                ></div>
                            )}
                            <div className="news-footer">
                                <div
                                    className="font-semibold flex justify-between items-center text-sm text-gray-400 border-t border-customBrown pt-2">
                                    <ReactionButton
                                        objectId={comment?.id}
                                        objectType={2}  // 2 = Comment
                                        initialLikes={comment?.like_count}
                                        initialDisLikes={comment?.dislike_count}
                                    />
                                    {isUpdated ? (
                                        <span className="hidden sm:flex">🕒 {t("ChangeComment")} {formatDate(comment?.updated_at)}</span>
                                    ) : (
                                        <span className="hidden sm:flex">🕒 {formatDate(comment?.created_at)}</span>
                                    )}
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