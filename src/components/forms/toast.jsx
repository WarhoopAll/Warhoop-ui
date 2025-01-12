import  { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCustomToast = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const showToast = (message) => {
            toast(message);
    };

    const ToastWrapper = () => isMounted ? (
        createPortal(
            <ToastContainer
                autoClose={2000}
                hideProgressBar={true}
                limit={5}
                stacked
                toastClassName={() => "bg-customBg border border-customBrown shadow-lg text-customTXT rounded-lg p-4"}
            />,
            document.body
        )
    ) : null;

    return { showToast, ToastWrapper };
};

export default useCustomToast;
