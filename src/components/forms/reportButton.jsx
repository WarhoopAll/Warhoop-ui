import {
    Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure, useDraggable
} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {POST} from "@/utils/fetch/fetchHelper";
import {Report} from "@/utils/fetch/fetchActions";

export default function ReportButton({objectId, objectType, victim, session, showToast}) {
    const {t} = useTranslation();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const targetRef = React.useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");

    const submitReport = async (onClose) => {
        if (!text || text.length < 50) {
            showToast(`${t("50ReqText")}`);
            return;
        }
        setLoading(true);

        if (session) {
            const body = {
                victim: victim, object_type: objectType, object_id: objectId, reason: text,
            };
            try {
                const response = await Report(body);
                if (response.status === 200 || response.status === 201) {
                    setText('');
                    onClose();
                    showToast(`${t("ReportSuccess")}`)
                } else {
                    const errorData = await response.json();
                    if (errorData && typeof errorData.message) {
                        showToast(errorData.message);
                    } else {
                        showToast(`${t("Error")}`);
                    }
                }
            } catch (error) {
                showToast(`${t("Error")}`);
            } finally {
                setLoading(false);
            }
        }
    };

    return (<div className="rounded-md mt-4 shadow-2xl">
        <Button
            onPress={onOpen}
            isDisabled={!session}
            className="max-h-[35px] cursor-pointer buttonClose hover:text-customTXT">
            {t("Report")}
        </Button>
        <Modal
            ref={targetRef}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            style={{maxWidth: "520px"}}
        >
            <ModalContent>
                {(onClose) => (<>
                    <ModalHeader {...moveProps} className="flex flex-col gap-1">{t("SendReport")}</ModalHeader>
                    <ModalBody>
                        <Textarea
                            isRequired
                            className="w-full min-h-40"
                            label={t("TextReport")}
                            value={text}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 500) {
                                    setText(value);
                                }
                            }}
                            classNames={{
                                base: "w-full",
                                input: " min-h-40 text-white custom-scrollbar",
                                inputWrapper: "shadow-lg bg-inputCol text-white",
                            }}
                        />
                        <div className="text-right text-sm text-gray-500">
                            {text?.length || 0}/500
                        </div>
                        <div className="text-sm text-red-500">
                            {text && text?.length < 50 ? t("50ReqText") : ""}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            {t("Cancel")}
                        </Button>
                        <Button
                            color="primary"
                            isLoading={loading}
                            onPress={() => submitReport(onClose)}
                        >
                            {t("Send")}
                        </Button>
                    </ModalFooter>
                </>)}
            </ModalContent>
        </Modal>
    </div>);
}
