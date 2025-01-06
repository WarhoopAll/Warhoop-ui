import EmojiPicker from "emoji-picker-react";
import {useState} from "react";

export default function Emoji({setComment,handleFocus}){
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    let timer;

    const handleMouseEnter = () => {
        clearTimeout(timer);
        handleFocus();
        setShowEmojiPicker(true);
    };
    const handleMouseLeave = () => {
        timer = setTimeout(() => {
            setShowEmojiPicker(false);
        }, 200);
    };

    const handleEmojiClick = (emojiObject) => {
        setComment((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    return (
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
    )
}