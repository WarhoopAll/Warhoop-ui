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
        return <></>;
    }

    return children;
};
