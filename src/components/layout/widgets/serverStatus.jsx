import {useState} from 'react'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

function formatUptime(uptimeString) {
    const parts = uptimeString ? uptimeString.split(":") : [];
    const {t} = useTranslation();

    if (parts.length === 3) {
        const days = parseInt(parts[0], 10);
        const hours = parseInt(parts[1], 10);
        const minutes = parseInt(parts[2], 10);

        let formattedUptime = "";

        if (days > 0) {
            formattedUptime += `${days} day${days !== 1 ? "s" : ""} `;
        }
        if (hours > 0) {
            formattedUptime += `${hours} hour${hours !== 1 ? "s" : ""} `;
        }
        if (minutes > 0) {
            formattedUptime += `${minutes} minute${minutes !== 1 ? "s" : ""}`;
        }
        if (formattedUptime === "") {
            return `${t("RegPage.Loading")}`;
        }
        return formattedUptime;
    } else {
        return `${t("RegPage.Loading")}`;
    }
}

export default function StatusServer() {
    const [characterOnline, setCharacterOnline] = useState(0);
    const [uptime, setUptime] = useState("00:00:00");

    const {t} = useTranslation();


    return (<Link to={`/online`}>
            <div className="status-server">
                <div className="card">
                    <div className="card-body">
                        <div className="card-void"></div>
                        <h1 className="mt-2 mb-2">
                            <span>Realm</span>
                            <br></br>
                            Berserk
                        </h1>
                    </div>
                    <div className="card-footer bluer">
                        <div className="media mb-3">
                            <div className="media-body align-self-center">
                                <div className="card-status-name">
                                    <h5>
                                        <span className="color-red">PvE</span>
                                        <span className="ml-2">x3</span>
                                    </h5>
                                </div>
                            </div>
                            <div className="online-border">
                                <div className="media">
                                    <div className="media-body">
                                        <div className="status-dot online align-self-center">
                                        </div>
                                    </div>
                                    <h5>{characterOnline}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="media footer-text">
                            <div className="media-body">
                                {t("ServerStats.Uptime")}
                            </div>
                            {uptime !== "0:0:0" && uptime !== undefined ? (<span>{formatUptime(uptime)}</span>) : (
                                <p>{t("RegPage.Loading")}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>);
}
