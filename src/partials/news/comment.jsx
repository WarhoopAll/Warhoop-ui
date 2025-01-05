import {useEffect, useRef, useState} from "react";
import EmojiPicker from "emoji-picker-react";
import { Button, Textarea } from "@nextui-org/react";

export default function CommentReply() {
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    let timer;


    const handleEmojiClick = (emojiObject) => {
        setComment((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handleMouseEnter = () => {
        clearTimeout(timer);
        handleFocus();
        setShowEmojiPicker(true);
    };

    const handleFocus = () => {
        setExpanded(true);
    };

    const handleBlur = () => {
        if (comment === "") {
            setExpanded(false);
        }
    };

    const handleMouseLeave = () => {
        timer = setTimeout(() => {
            setShowEmojiPicker(false);
        }, 200);
    };
    return (
        <div className="relative mb-8">
            <div
                className="absolute right-0 z-30"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <button aria-label="Emoji">😊</button>

                {showEmojiPicker && (
                    <div
                        className="absolute top-full right-0 z-50 emoji-picker"
                    >
                        <EmojiPicker
                            skinTonesDisabled
                            allowExpandReactions={false}
                            reactionsDefaultOpen={false}
                            previewConfig={{ showPreview : false }}
                            emojiStyle='apple'
                            searchDisabled
                            onEmojiClick={handleEmojiClick}
                            categories={[
                                {
                                    name: 'recent',
                                    category: 'suggested',
                                },
                                {
                                    name: "Smile",
                                    category: "smileys_people",
                                },
                                {
                                    name: "animals",
                                    category: "animals_nature",
                                },
                                {
                                    name: "food",
                                    category: "food_drink",
                                },
                                {
                                    name: "travel",
                                    category: "travel_places",
                                },
                                {
                                    name: "objects",
                                    category: "objects",
                                },
                                {
                                    name: "symbols",
                                    category: "symbols",
                                },
                                {
                                    name: "activities",
                                    category: "activities",
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
            <Textarea
                id="comment"
                placeholder="Оставьте комментарий..."
                value={comment}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setComment(e.target.value)}
                classNames={{
                    input: " min-h-[100px] max-h-full text-white custom-scrollbar",
                    inputWrapper: "shadow-lg bg-inputCol text-white ",
                }}
                className={`w-full text-white transition-all duration-300
                    ${expanded ? "h-32 " : "h-12 "}`}

            />

            {expanded && (
                <div className="flex justify-end mt-2">
                    <Button
                        onPress={handleBlur}
                        className="text-white px-6 py-2 rounded-lg"
                    >
                        Отправить
                    </Button>
                </div>
            )}

        </div>
    );
}
