import {useState, useEffect} from 'react';
import i18n from "@/utils/i18n/i18n";

export default function I18nLoader({children}) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        i18n.on('loaded', () => {
            setIsReady(true);
        });

        i18n.loadLanguages(i18n.language, (err) => {
            if (!err) {
                setIsReady(true);
            }
        });
    }, []);

    if (!isReady) {
        return <div className="flex justify-center items-center my-10">
            <div className="custom-spinner"></div>
        </div>;
    }

    return children;
};
