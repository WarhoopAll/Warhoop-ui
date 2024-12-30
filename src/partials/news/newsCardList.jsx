import {Link} from 'react-router-dom';
import {formatDate} from "@/utils/formatDate";
import Pagination from "@/components/features/pagination";
import {ThumbDownIcon, ThumbUpIcon} from "@/components/icons/icons";

export default function NewsCardList({props}) {
    const {articles, currentPage, totalPage, watchPage, loading} = props;

    return (
        <div className="flex flex-col min-h-[32vh]">
            <div className="grow">
                {articles?.length > 0 ? (
                    articles.map((article) => (
                        <Link to={`news-post/${article?.id}`}
                              key={article?.id}
                              className="wow-news-article-image bg-customBg shadow-lg rounded-lg border border-customBrown p-3 mb-4 hover:border-rose-950">
                            <div className="wow-news-image">
                                <img
                                    src={article?.image_url}
                                    alt="Article Image"
                                    className="wow-news-article-image-width"
                                />
                            </div>
                            <div className="grow">
                                <h2 className="font-semibold text-white">
                                    <span dangerouslySetInnerHTML={{__html: article?.title}}></span>
                                </h2>
                                <div className="mb-7" dangerouslySetInnerHTML={{__html: article?.content}}></div>
                                <div className="flex flex-wrap text-sm">
                                    <div
                                        className="flex items-center after:content-['·'] after:text-slate-400 after:px-2">
                                        <div className="font-medium text-red-700">
                                            {article?.profile?.name}
                                        </div>
                                    </div>
                                    <div className="flex items-center ">
                                        <span className="text-slate-500">{formatDate(article?.created_at)}</span>
                                    </div>
                                    {article?.comments_count > 0 && (
                                        <div
                                            className="flex items-center before:content-['·'] before:text-slate-400 before:px-2">
                                            <span className="text-slate-500">{article?.comments_count} Comments</span>
                                        </div>
                                    )}
                                    {article?.like_count > 0 && (
                                        <div className="flex items-center before:content-['·'] before:text-slate-400 before:px-2">
                                            <ThumbUpIcon />
                                            <span className="text-slate-500 ml-1">{article?.like_count}</span>
                                        </div>
                                    )}
                                    {article?.dis_like_count > 0 && (
                                        <div className="flex items-center before:content-['·'] before:text-slate-400 before:px-2">
                                            <ThumbDownIcon/>
                                            <span className="text-slate-500 ml-1">{article?.dis_like_count}</span>
                                        </div>
                                    )}


                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-white">No News available.</p>
                )}
            </div>

            {totalPage > 1 && (
                <div className="py-4">
                    <Pagination props={{watchPage, totalPage, currentPage, loading}}/>
                </div>
            )}
        </div>
    );
}