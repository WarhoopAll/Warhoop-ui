import Layout from "@/layouts/layout";
import {useTranslation} from "react-i18next";

export default function NotFound() {
    const {t} = useTranslation();
    return (
        <Layout>
            <div
                className="flex flex-col justify-center items-center min-h-[24.5vh]  bg-customBg shadow-lg rounded-lg border border-customBrown">
                <h1 className="text-6xl font-bold text-white">404</h1>
                <p className="text-2xl text-white mt-4">{t("PageNotFound")}</p>
            </div>
        </Layout>
    );
}
