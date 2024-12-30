import {useTranslation} from "react-i18next";
import {Button} from "@nextui-org/react";

export default function Pagination({props, showNavigationButtons = true}) {
    const {t} = useTranslation();
    let pages = []

    const getRange = (start, end) => Array(end - start + 1).fill().map((v, i) => i + start)

    let delta
    if (props.totalPage <= 7 + 4) {
        delta = 7 + 4
    } else {
        delta = props.currentPage > 4 + 1 && props.currentPage < props.totalPage - (4 - 1) ? 2 : 4
        delta += 4
    }
    const range = {
        start: Math.round(props.currentPage - delta / 2), end: Math.round(props.currentPage + delta / 2)
    }
    if (range.start - 1 === 1 || range.end + 1 === props.totalPage) {
        range.start += 1
        range.end += 1
    }
    pages = props.currentPage > delta ? getRange(Math.min(range.start, props.totalPage - delta), Math.min(range.end, props.totalPage)) : getRange(1, Math.min(props.totalPage, delta + 1))
    const withDots = (value, pair) => (pages.length + 1 !== props.totalPage ? pair : [value])

    if (pages[0] !== 1) {
        pages = withDots(1, [1, '...']).concat(pages)
    }
    if (pages[pages.length - 1] < props.totalPage) {
        pages = pages.concat(withDots(props.totalPage, ['...', props.totalPage]))
    }

    return (
        <div>
            {props.loading ? (<></>) : (
                <nav className="flex justify-center">
                    {showNavigationButtons && props.currentPage > 1 && (
                        <div className="mr-2">
                            <Button
                                onPress={() => props.watchPage(props.currentPage - 1)}
                                className="btn bg-black text-indigo-500"
                            >
                                <span className="hidden sm:inline">{t("Pagination.Previous")}</span>
                            </Button>
                        </div>
                    )}

                    <div className="grow text-center">
                        <ul className="inline-flex text-sm font-medium space-x-1">
                            {pages.map((element, index) => (
                                element === "..." ? (
                                    <li key={index}>
                                        <span className="inline-flex items-center justify-center leading-5 px-2 py-2 text-slate-400">…</span>
                                    </li>
                                ) : element === props.currentPage ? (
                                    <li key={index}>
                                    <span className="inline-flex items-center justify-center rounded-md leading-5 px-2 py-2 bg-customBg hover:bg-customBg text-white shadow-sm">
                                        <span className="w-5">{element}</span>
                                    </span>
                                    </li>
                                ) : (
                                    <li key={index}>
                                        <button
                                            onClick={() => props.watchPage(element)}
                                            className="inline-flex text-center justify-center rounded-full leading-5 px-2 py-2 text-slate-600 hover:text-white border border-transparent">
                                            <span className="w-5">{element}</span>
                                        </button>
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>

                    {showNavigationButtons && props.currentPage < props.totalPage && (
                        <div className="ml-2">
                            <Button
                                onPress={() => props.watchPage(props.currentPage + 1)}
                                className="btn bg-white border-slate-200 hover:border-slate-300 text-indigo-500"
                            >
                                <span className="hidden sm:inline">{t("Pagination.Next")}</span>
                            </Button>
                        </div>
                    )}
                </nav>
            )}
        </div>
    );

}
