import { useState, useEffect } from "react";
import {
    Button,
    Textarea,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    ModalContent
} from "@nextui-org/react";
import Emoji from "@/components/forms/emoji";
import { useTranslation } from "react-i18next";
import { CreateComment, DeleteComment, UpdateComment } from "@/utils/fetch/fetchActions";
import { useParams } from "react-router-dom";

export default function CommentReply({
                                         addComment,
                                         deleteComment,
                                         initialValue = "",
                                         isEditing = false,
                                         commentId = null,
                                         onCancel,
                                         session,t
                                     }) {
    const [expanded, setExpanded] = useState(false);
    const [comment, setComment] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { id } = useParams();

    useEffect(() => {
        if (initialValue) {
            setExpanded(true);
        }
    }, [initialValue]);

    const handleFocus = () => {
        setExpanded(true);
    };

    const handleBlur = () => {
        if (comment === "" && !isEditing) {
            setExpanded(false);
        }
    };

    const handleSubmit = async () => {
        if (!comment.trim()) return;

        setLoading(true);
        try {
            let response;

            if (isEditing && commentId) {
                response = await UpdateComment({
                    id: commentId,
                    text: comment,
                });
            } else {
                response = await CreateComment({
                    news_id: parseInt(id, 10),
                    text: comment,
                });
            }

            const data = await response.json();

            if (data?.status === "success") {
                addComment(data.data);
                setComment("");
                setExpanded(false);
                if (onCancel) onCancel();
            } else {
                console.error("Error submitting comment");
            }
        } catch (error) {
            console.error("Failed to submit comment", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!commentId) return;

        setLoading(true);
        try {
            const response = await DeleteComment(commentId);
            const data = await response.json();
            if (response.ok && data?.status === "success") {
                deleteComment(commentId);
                if (onCancel) onCancel();
            } else {
                console.error("Failed to delete comment");
            }
        } catch (error) {
            console.error("Error deleting comment", error);
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
                        placeholder={t(isEditing ? "EditComment" : "LeaveComment")}
                        value={comment}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={(e) => setComment(e.target.value)}
                        classNames={{
                            input: "min-h-[100px] max-h-full text-white custom-scrollbar",
                            inputWrapper: "shadow-lg bg-inputCol text-white",
                        }}
                        className={`w-full text-white transition-all duration-300 ${expanded ? "h-32" : "h-12"}`}
                    />
                    {expanded && (
                        <div className="flex justify-end mt-2 space-x-4">
                            <Button isLoading={loading}
                                    onPress={handleSubmit}
                                    className="text-white px-6 py-2 rounded-lg bg-blue-500">
                                {t(isEditing ? "Save" : "Send")}
                            </Button>
                            {isEditing && (
                                <>
                                    <Button onPress={onCancel} className="text-white px-6 py-2 rounded-lg bg-gray-500">
                                        {t("Cancel")}
                                    </Button>
                                    <Button onPress={onOpen} className="text-white px-6 py-2 rounded-lg bg-red-500">
                                        {t("Delete")}
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-400">{t("CommentLogIn")}</p>
            )}

            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{t("Confirm")}</ModalHeader>
                            <ModalBody>
                                    <p>{t("AreYouSure")}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    {t("No")}
                                </Button>
                                <Button color="danger" variant="light" onPress={handleDelete}>
                                    {t("Yes")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
}
