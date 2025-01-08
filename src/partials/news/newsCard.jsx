import {useState} from "react";
import {formatDate} from "@/utils/formatDate";
import ReactionButton from "@/components/forms/reactionButton";
import {
    Button,
    Tooltip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Textarea,
    useDisclosure,
    useDraggable
} from "@nextui-org/react";
import {FaEdit} from "@react-icons/all-files/fa/FaEdit";
import {UpdateNews} from "@/utils/fetch/fetchActions";
import useCustomToast from "@/components/forms/toast";

export default function NewsCard({news, session, updateNews, t}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const {showToast} = useCustomToast();

    const isUpdated = news?.updated_at && news?.updated_at !== news?.created_at;
    const isAuthor = session?.profile?.id === news?.profile?.id;
    const access = session?.access?.security_level > 2;

    const [title, setTitle] = useState(news?.title);
    const [text, setText] = useState(news?.text);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (onClose) => {
        setLoading(true);
        try {
            const body = {
                id: news?.id, title, text
            };
            const response = await UpdateNews(body);
            const result = await response.json();

            if (result?.status === 'success') {
                updateNews(result?.data);
                onClose();
                showToast(result?.message);
            } else {
                showToast(result?.message || 'Error updating news');
            }
        } catch (error) {
            showToast('Network error or server unavailable');
        } finally {
            setLoading(false);
        }
    };

    return (<div
        className="news-container bg-customBg rounded-lg border border-customBrown p-8 text-white shadow-lg min-h-[30vh] flex flex-col">
        <div className="news-header mb-6 border-b border-customBrown pb-4 flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold mb-2">{news?.title}</h1>
                <div className="news-meta text-sm text-gray-400 flex items-center">
                    <span className="text-red-800">{news?.profile?.name}</span>
                    <span className="mr-2 ml-2 hidden sm:flex"> | </span>
                    {isUpdated ? (<span className="hidden sm:flex font-semibold text-slate-500">
                                {t("ChangeComment")} {formatDate(news?.updated_at)}
                            </span>) : (<span className="hidden sm:flex font-semibold text-slate-500">
                                {formatDate(news?.created_at)}
                            </span>)}
                </div>
            </div>
            {isAuthor && access && (<div className="flex items-center">
                <Tooltip content={t("Edit")} showArrow={true}>
                    <Button size="sm" className="buttonClose" onPress={onOpen}>
                        <FaEdit size={18}/>
                    </Button>
                </Tooltip>
            </div>)}
        </div>
        <div
            className="news-content leading-relaxed text-lg text-customTXT flex-grow break-words whitespace-pre-wrap">
            <div dangerouslySetInnerHTML={{__html: news?.text}}></div>
        </div>
        <div className="news-footer mt-8 flex justify-between items-center text-sm text-gray-300">
            <div className="font-semibold flex items-center text-gray-400">
                <ReactionButton
                    objectId={news?.id}
                    objectType={1}  // 1 = News
                    initialLikes={news?.like_count}
                    initialDisLikes={news?.dislike_count}
                />
            </div>
            <span className="flex items-center">💬 {news?.comments_count} Comments</span>
        </div>
        <Modal
            ref={targetRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            style={{maxWidth: "780px"}}
        >
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader {...moveProps} className="flex flex-col gap-1">{t("EditNews")}</ModalHeader>
                    <ModalBody>
                        <Input
                            label={t("Title")}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            classNames={{
                                inputWrapper: "shadow-lg bg-inputCol text-white",
                            }}
                        />
                        <Textarea
                            label={t("Content")}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            fullWidth
                            rows={6}
                            classNames={{
                                base: "max-w",
                                input: "resize-y min-h-[200px] text-white custom-scrollbar",
                                inputWrapper: "shadow-lg bg-inputCol text-white",
                            }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            {t("Cancel")}
                        </Button>
                        <Button
                            color="primary"
                            isLoading={loading}
                            onPress={() => handleUpdate(onClose)}
                        >
                            {t("Save")}
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    </div>);
}
