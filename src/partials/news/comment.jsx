import { useContext, useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import Emoji from "@/components/forms/emoji";
import { UserContext } from "@/context/userContext";
import { useTranslation } from "react-i18next";
import {CreateComment} from "@/utils/fetch/fetchActions";
import {useParams} from "react-router-dom";

export default function CommentReply() {
    const { t } = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const { session } = useContext(UserContext);
    const {id} = useParams();

    const handleFocus = () => {
        setExpanded(true);
    };

    const handleBlur = () => {
        if (comment === "") {
            setExpanded(false);
        }
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        setLoading(true);
        try {
            const response = await CreateComment({
                news_id: parseInt(id, 10),
                text: comment,
            });

            if (response?.status === "success") {
                // addComment(response.data);
                setComment("");
                setExpanded(false);
            }
        } catch (error) {
            console.error("Failed to submit comment", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative mb-8">
            {session ? (
                <>
                    <Emoji setComment={setComment} handleFocus={handleFocus} />
                    <Textarea
                        id="comment"
                        placeholder={t("LeaveComment")}
                        value={comment}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setComment(e.target.value)}
                        classNames={{
                            input: "min-h-[100px] max-h-full text-white custom-scrollbar",
                            inputWrapper: "shadow-lg bg-inputCol text-white",
                        }}
                        className={`w-full text-white transition-all duration-300 ${
                            expanded ? "h-32" : "h-12"
                        }`}
                    />
                    {expanded && (
                        <div className="flex justify-end mt-2">
                            <Button
                                isLoading={loading}
                                onPress={handleSubmit}
                                className="text-white px-6 py-2 rounded-lg"
                            >
                                {t("Send")}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-400">
                    {t("CommentLogIn")}
                </p>
            )}
        </div>
    );
}
