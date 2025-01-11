import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {ServerStatus} from "@/utils/fetch/fetchActions";
import {Skeleton} from "@nextui-org/react";
import {formatUptime} from "@/utils/formatDate";
import config from '@/../config.json';

export default function StatusServer() {
    const {t} = useTranslation();
    const [serverStatus, setServerStatus] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                setLoading(true);
                const response = await ServerStatus();

                if (response.status === 200) {
                    const jsonData = await response.json();
                    setServerStatus(jsonData?.data || undefined);
                    setIsOnline(true);
                } else {
                    setIsOnline(false);
                    setServerStatus(undefined);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (error) {
                setIsOnline(false);
                setServerStatus(undefined);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1500);
            }
        };

        fetchStatus();
    }, []);

    return (
        <Link to={`/${isOnline ? "online" : "offline"}`}>
            {loading ? (
                <Skeleton className="status-server"></Skeleton>
            ) : (
                <div className="status-server max-w-md max-h-md">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-void"></div>
                            <h1 className="mt-2 mb-2 p-5">
                                {serverStatus?.realm?.name || t("ServerStats.Offline")}
                            </h1>
                        </div>
                        <div className="card-footer bluer">
                            <div className="media mb-3">
                                <div className="media-body align-self-center">
                                    <div className="card-status-name">
                                        <h5>
                                            <span className="color-red">{config.Realm.flag || "undefined"}</span>
                                            <span className="ml-2">{config.Realm.rate || "undefined"}</span>
                                        </h5>
                                    </div>
                                </div>
                                <div className="online-border">
                                    <div className="media">
                                        <div className="media-body">
                                            <div
                                                className={`status-dot ${isOnline ? "online" : "offline"} align-self-center`}>
                                            </div>
                                        </div>
                                        <h5>{isOnline ? serverStatus?.charOnline || serverStatus?.charOnline :"0"}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="media footer-text">
                                <div className="media-body">
                                    {t("ServerStats.Uptime")}
                                </div>
                                {serverStatus?.starttime ? (
                                    <span>
                                        {formatUptime(serverStatus?.starttime)}
                                    </span>
                                ) : (
                                    <span>{t("ServerStats.Offline")}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Link>
    );
}
