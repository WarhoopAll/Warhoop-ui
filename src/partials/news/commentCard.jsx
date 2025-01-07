import { formatDate } from "@/utils/formatDate";
import { Image } from "@nextui-org/image";
import { Tooltip } from "@nextui-org/react";
import CommentReply from "@/partials/news/comment";
import { useTranslation } from "react-i18next";
import ReactionButton from "@/components/forms/ReactionButton";

export default function CommentCard({ comments }) {
    const { t } = useTranslation();

    return (
        <div className="news-comments-container mt-6 bg-customBg rounded-lg border border-customBrown p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-6">{t("Comments")}</h2>
            <CommentReply />
            {comments?.length > 0 ? (
                comments?.map((comment) => {
                    const isUpdated = comment?.updated_at && comment?.updated_at !== comment?.created_at;

                    return (
                        <div
                            key={comment.id}
                            className="news-comment-item p-4 cursor-pointer border border-customBrown pb-6 mb-6 flex flex-col transition duration-300 rounded-lg relative"
                        >
                            <div className="news-header mb-4 flex items-center space-x-6">
                                <Image
                                    src={comment?.profile?.avatar}
                                    alt={comment?.profile?.name}
                                    className="w-12 h-12 rounded-full shadow-2xl"
                                />
                                <div>
                                    <Tooltip content={comment?.profile?.name} showArrow={true}>
                                        <span className="text-red-400 font-bold text-lg">{comment?.profile?.name}</span>
                                    </Tooltip>
                                    <p className="text-sm text-gray-500">{comment?.profile?.rank}</p>
                                </div>
                            </div>

                            <div className="news-content leading-relaxed text-lg text-gray-300 flex-grow mb-6">
                                <div
                                    dangerouslySetInnerHTML={{ __html: comment?.text }}
                                    className="break-words whitespace-pre-wrap"
                                ></div>
                            </div>

                            <div className="news-footer">
                                <div
                                    className="font-semibold flex justify-between items-center text-sm text-gray-400 border-t border-customBrown"
                                >
                                    <ReactionButton
                                        objectId={comment?.id}
                                        objectType={2}  // 2 = Comment
                                        initialLikes={comment?.like_count}
                                        initialDisLikes={comment?.dislike_count}
                                    />
                                    {isUpdated ? (
                                        <span>🕒 {t("ChangeComment")} {formatDate(comment?.updated_at)}</span>
                                    ) : (
                                        <span>🕒 {formatDate(comment?.created_at)}</span>
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
