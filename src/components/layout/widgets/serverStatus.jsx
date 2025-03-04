import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ServerStatus } from "@/utils/fetch/fetchActions";
import { Skeleton } from "@nextui-org/react";
import { formatUptime } from "@/utils/formatDate";
import useCustomToast from "@/components/forms/toast";

export default function StatusServer() {
    const { t } = useTranslation();
    const [serverStatus, setServerStatus] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const {showToast} = useCustomToast();

    const cache = "serverStatus";
    const expiration_time = 3 * 60 * 1000;
    const retryDelay = 30 * 1000;

    useEffect(() => {
        const getCachedStatus = () => {
            const cachedData = localStorage.getItem(cache);

            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                const { timestamp, data, isOnline } = parsedData;

                if (Date.now() - timestamp < expiration_time) {
                    setServerStatus(data);
                    setIsOnline(isOnline);
                    setLoading(false);
                    return true;
                }
            }
            return false;
        };

        const fetchStatus = async (retry = true) => {
            try {
                setLoading(true);
                const response = await ServerStatus();

                if (response.status === 200) {
                    const jsonData = await response.json();
                    const newStatus = { data: jsonData?.data || undefined, isOnline: true };

                    localStorage.setItem(cache, JSON.stringify({ ...newStatus, timestamp: Date.now() }));

                    setServerStatus(jsonData?.data || undefined);
                    setIsOnline(true);
                } else {
                    throw new Error("Server returned non-200 response");
                }
            } catch (error) {
                setIsOnline(false);
                setServerStatus(undefined);

                if (retry) {
                    setTimeout(() => fetchStatus(false), retryDelay);
                }
            } finally {
                setLoading(false);
            }
        };

        if (!getCachedStatus()) {
            fetchStatus();
        }
    }, []);

    const copyToClipboard = () => {
        if (serverStatus?.realmlis) {
            navigator.clipboard.writeText(`set realmlist ${serverStatus.realmlis}`);
            showToast("Realmlist скопирован в буфер обмена!");
        }
    };

    return (<>
            {loading ? (
                <Skeleton className="status-server"></Skeleton>
            ) : (
                <div className="status-server max-w-md max-h-md">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-void"></div>
                            <h1 className="p-2.5">
                                {serverStatus?.realm?.name || t("ServerStats.Offline")}
                            </h1>
                        </div>
                        <div className="card-footer bluer">
                            <div className="media mb-3">
                                <div className="media-body align-self-center">
                                    <div className="card-status-name">
                                        <h5>
                                            <span className="color-red">
                                                {serverStatus?.flag || ""}
                                            </span>
                                            <span className="ml-2">{serverStatus?.rate || ""}</span>
                                        </h5>
                                    </div>
                                </div>
                                <Link to={`/online`}>
                                <div className="online-border">
                                    <div className="media">
                                        <div className="media-body">
                                            <div
                                                className={`status-dot ${isOnline ? "online" : "offline"} align-self-center`}
                                            ></div>
                                        </div>
                                        <h5>{isOnline ? serverStatus?.charOnline || serverStatus?.charOnline : "0"}</h5>
                                    </div>
                                </div>
                                </Link>
                            </div>
                            <div className="media footer-text">
                                <div className="media-body">{t("ServerStats.Uptime")}</div>
                                {serverStatus?.starttime ? (
                                    <span>{formatUptime(serverStatus?.starttime)}</span>
                                ) : (
                                    <span>{t("ServerStats.Offline")}</span>
                                )}
                            </div>
                            <div className="copy-realmlist mt-3 text-center cursor-pointer p-2 bg-customBg text-white rounded-lg"
                                 onClick={copyToClipboard}>
                                set realmlist {serverStatus?.realmlis || "undefined"}
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </>);
}