import {Button} from "@nextui-org/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useEffect, useState} from "react";

export default function Pagination({props, showNavigationButtons = true}) {
    if (!props || !props.totalPage || !props.currentPage) {
        return null;
    }
    let pages = [];
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Mobile threshold
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getRange = (start, end) => Array(end - start + 1)
        .fill()
        .map((_, i) => i + start);

    let delta = isMobile ? 3 : 5; // Fewer pages on mobile
    const range = {
        start: Math.max(1, Math.round(props.currentPage - delta / 2)),
        end: Math.min(props.totalPage, Math.round(props.currentPage + delta / 2)),
    };

    if (range.start - 1 === 1 || range.end + 1 === props.totalPage) {
        range.start += 1;
        range.end += 1;
    }

    pages = props.currentPage > delta ? getRange(Math.min(range.start, props.totalPage - delta), Math.min(range.end, props.totalPage)) : getRange(1, Math.min(props.totalPage, delta + 1));

    const withDots = (value, pair) => pages.length + 1 !== props.totalPage ? pair : [value];

    if (pages[0] !== 1) {
        pages = withDots(1, [1, "..."]).concat(pages);
    }
    if (pages[pages.length - 1] < props.totalPage) {
        pages = pages.concat(withDots(props.totalPage, ["...", props.totalPage]));
    }

    return (<div className="pagination-container">
            {props.loading ? null : (<nav className="flex justify-center">
                    <div
                        className={`grow text-center ${isMobile ? "overflow-visible" : "overflow-x-auto"} md:overflow-visible scrollbar-hide`}
                    >
                        <ul
                            className={`inline-flex text-sm font-medium items-center ${isMobile ? "space-x-1" : "space-x-0.5"}`}
                        >
                            {showNavigationButtons && (<li>
                                    <Button
                                        isDisabled={props.currentPage === 1}
                                        auto
                                        onPress={() => props.watchPage(props.currentPage - 1)}
                                        className="buttonClose"

                                    >
                                        <ChevronLeftIcon className="h-5 w-5"/>
                                    </Button>
                                </li>)}

                            {pages.map((element, index) => element === "..." ? (<li key={index}>
                                        <span
                                            className="inline-flex items-center justify-center leading-5 px-2 py-2 text-slate-400">
                                            …
                                        </span>
                                </li>) : element === props.currentPage ? (<li key={index}>
                                        <span
                                            className="inline-flex items-center justify-center rounded-md leading-5 px-2 py-2 bg-inputCol text-white shadow">
                                            {element}
                                        </span>
                                </li>) : (<li key={index}>
                                    <button
                                        onClick={() => props.watchPage(element)}
                                        className="inline-flex justify-center rounded-full leading-5 px-2 py-2 text-slate-600 hover:text-white"
                                    >
                                        {element}
                                    </button>
                                </li>))}

                            {showNavigationButtons && props.currentPage < props.totalPage && (<li>
                                    <Button
                                        auto
                                        onPress={() => props.watchPage(props.currentPage + 1)}
                                        className="buttonClose"

                                    >
                                        <ChevronRightIcon className="h-5 w-5"/>
                                    </Button>
                                </li>)}
                        </ul>
                    </div>
                </nav>)}
        </div>);
}
