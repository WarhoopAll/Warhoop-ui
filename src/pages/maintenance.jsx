import {useTranslation} from "react-i18next";

export default function Maintenance() {
    const {t} = useTranslation();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-col justify-center items-center text-center min-h-[40vh] max-w-4xl bg-customBg shadow-2xl rounded-xl border-4 border-customBrown p-10">
                <h1 className="text-6xl font-extrabold text-white">{t("Maintenance.Main")}</h1>
                <p className="text-3xl text-gray-300 mt-6">{t("Maintenance.Text")}</p>
            </div>
        </div>

    );
}
