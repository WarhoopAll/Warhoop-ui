import {Link} from 'react-router-dom';
import {formatDate} from "@/utils/formatDate";

export default function NewsMin({props}) {
    return (<>
            {props?.articles?.map((article) => (<Link to={`news-post/${article?.id}`}
                                                      key={article?.id}
                                                      className="wow-news-article-image bg-customBg shadow-lg rounded-lg border border-customBrown p-3 mb-4 hover:border-rose-950">
                    <div className="wow-news-image">
                        <img
                            src={article?.image_url}
                            alt="Article Image"
                            className="wow-news-article-image-width"
                        />
                        <div className="wow-news-right-line"></div>
                    </div>
                    <div className="grow">
                        <h2 className="font-semibold text-customTXT">
                            <span dangerouslySetInnerHTML={{__html: article?.title}}></span>
                        </h2>
                        <div className="mb-7" dangerouslySetInnerHTML={{__html: article?.content}}></div>
                        <div className="flex flex-wrap text-sm">
                            <div
                                className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                                <div className="font-medium text-red-700">
                                    <div className="flex items-center">
                                        {article?.profile?.name}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                                <span className="text-slate-500">{formatDate(article?.created_at)}</span>
                            </div>
                            <div
                                className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                                <span className="text-slate-500">{article?.comments_count} Comments</span>
                            </div>
                            <div
                                className="flex items-center after:block after:content-['·'] last:after:content-[''] after:text-sm after:text-slate-400 after:px-2">
                                <span className="text-slate-500">{article?.like_count} Like</span>
                            </div>
                        </div>
                    </div>
                </Link>))}
        </>);
}
