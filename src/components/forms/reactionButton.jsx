import {HandThumbUpIcon, HandThumbDownIcon} from "@heroicons/react/24/solid";
import {useState} from "react";
import {Reaction} from "@/utils/fetch/fetchActions";
import {Tooltip} from "@nextui-org/react";
import {useTranslation} from "react-i18next";

export default function ReactionButton({objectId, objectType, initialLikes = 0, initialDisLikes = 0, showToast}) {
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDisLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [hasDisliked, setHasDisliked] = useState(false);
    const [loading, setLoading] = useState(false);
    const {t} = useTranslation();


    const handleReaction = async (reactionType) => {
        if (loading) return;
        setLoading(true);

        try {
            const body = {
                object_type: objectType,
                object_id: objectId,
                reaction_type: reactionType,
            };

            const response = await Reaction(body);
            const responseData = await response.json();

            if (response.ok) {
                if (responseData.data === null) {
                    if (reactionType === 1) {
                        setLikes(likes > 0 ? likes - 1 : 0);
                        setHasLiked(false);
                    } else if (reactionType === 2) {
                        setDislikes(dislikes > 0 ? dislikes - 1 : 0);
                        setHasDisliked(false);
                    }
                } else {
                    if (reactionType === 1) {
                        setLikes(likes + 1);
                        setHasLiked(true);
                    } else if (reactionType === 2) {
                        setDislikes(dislikes + 1);
                        setHasDisliked(true);
                    }
                }
            } else {
                showToast(`${t("Error")}`);
            }
        } catch (error) {
            showToast(`${t("Error")}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center bg-inputCol rounded-lg p-2 mt-4 shadow-2xl">
            <Tooltip content={t("Like")} showArrow={true}>
                <div
                    className={`cursor-pointer flex items-center ${hasLiked ? "text-customTXT" : ""}`}
                    onClick={() => handleReaction(1)}
                >
                    {loading && hasLiked ? (
                        <span className="loader w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                        <HandThumbUpIcon className="w-5 h-5 hover:text-customTXT"/>
                    )}
                    <span className="ml-2">{likes}</span>
                </div>
            </Tooltip>
            <div className="border-s border-customBrown ml-2" onClick={() => handleReaction(2)}>
                <Tooltip content={t("DisLike")} showArrow={true}>

                    <div className={`cursor-pointer flex items-center ${hasDisliked ? "text-customTXT" : ""}`}>
                        {loading && hasDisliked ? (
                            <span
                                className="loader w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <HandThumbDownIcon className="w-5 h-5 hover:text-customTXT ml-2"/>
                        )}
                        <span className="ml-2">{dislikes}</span>
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}
