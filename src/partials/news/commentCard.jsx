import {formatDate} from "@/utils/formatDate";
import {Image} from "@nextui-org/image";
import {Tooltip} from "@nextui-org/react";
import CommentReply from "@/partials/news/comment";


export default function CommentCard({comments}) {
    return (
        <div
            className="news-comments-container mt-6 bg-customBg rounded-lg border border-customBrown p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>
            <CommentReply/>
            {comments?.length > 0 ? (
                comments?.map((comment) => (
                    <div
                        key={comment.id}
                        className="news-comment-item p-4 cursor-pointer border border-customBrown pb-6 mb-6 flex flex-col transition duration-300 rounded-lg"
                    >
                        <div className="news-header mb-4 flex items-center space-x-6">
                            <Image
                                src={comment?.profile?.avatar}
                                alt={comment?.profile?.name}
                                className="w-12 h-12 rounded-full shadow-2xl"
                            />
                            <div>
                                <Tooltip content={comment?.profile?.name} color="" showArrow={true}>
                                    <span className="text-red-400 font-bold text-lg">{comment?.profile?.name}</span>
                                </Tooltip>
                                <p className="text-sm text-gray-500">{comment?.profile?.rank}</p>
                            </div>
                        </div>

                        <div className="news-content leading-relaxed text-lg text-gray-300 flex-grow mb-6">
                            <div dangerouslySetInnerHTML={{__html: comment?.text}}></div>
                        </div>

                        <div className="news-footer">
                            <div
                                className="p-4 font-semibold flex justify-between items-center text-sm text-gray-400 -mb-6 border-t border-customBrown">
                                <Tooltip className="bg-inputCol text-white"
                                         content={
                                             <div className="px-1 py-2 ">
                                                 <div className="text-small font-bold">comment like:</div>
                                                 <div className="text-tiny text-center">{comment?.like_count || 0}</div>
                                             </div>} showArrow={true}>
                                    <span>👍 {comment?.like_count || 0} Like</span>
                                </Tooltip>
                                <span>🕒 {formatDate(comment?.created_at)}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-gray-400">Комментариев пока нет.</p>
            )}
        </div>
    );
}
