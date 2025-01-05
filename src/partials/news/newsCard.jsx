import {formatDate} from "@/utils/formatDate";

export default function NewsCard({ news }) {

    return (
        <div className="news-container bg-customBg rounded-lg border border-customBrown p-8 text-white shadow-lg min-h-[30vh] flex flex-col">
            <div className="news-header mb-6 border-b border-customBrown pb-4">
                <h1 className="text-3xl font-bold mb-2">{news?.title}</h1>
                <div className="news-meta text-sm text-gray-400">
                    <span className="text-red-800">{news?.profile?.name}</span>
                    <span> | </span>
                    <span className="font-semibold text-slate-500">{formatDate(news?.created_at)}</span>
                </div>
            </div>
            <div className="news-content leading-relaxed text-lg text-customTXT flex-grow">
                <div dangerouslySetInnerHTML={{ __html: news?.text }}></div>
            </div>
            <div className="news-footer mt-8 flex justify-between items-center text-sm text-gray-300">
                <span>👍 {news?.like_count} Like</span>
                <span>💬 {news?.comments_count} Comments</span>
            </div>
        </div>
    );
}
