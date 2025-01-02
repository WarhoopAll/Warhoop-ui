import {useEffect, useState} from 'react';
import OnlineTable from '../partials/online/OnlineTable';
import images from "../image.json";
import {useTranslation} from "react-i18next";
import Navigation from "@/components/features/navigation";
import {Pagination} from "@nextui-org/react";
import {GET} from "@/utils/fetch/fetchHelper";
import Layout from "@/layouts/layout";

export default function Online() {
    const [characters, setCharacters] = useState([]);
    const {t} = useTranslation();
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPages] = useState(1)
    const limit = 10

    const fetchCharData = async () => {
        let offset = (currentPage * limit) - limit;
        const url = `online?offset=${offset}&limit=${limit}`;

        try {
            const response = await GET({url});
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            const characters = data.data;
            setTotalPages(data?.totalpages);
            setCharacters(characters);
        } catch (error) {

        }
    };

    const watchPage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        fetchCharData();
    }, [currentPage, limit]);

    return (<div>
           <Layout welcome={false}>
                    <div className="mb-4">
                            <h1 className="text-2xl md:text-3xl text-white font-bold flex items-center">
                                {t("Menu.Online")}
                            </h1>
                        </div>

                    <OnlineTable characters={characters} images={images} t={t}/>
                    <div className="mt-3">
                        {totalPage > 1 && <Pagination props={{watchPage, totalPage, currentPage}}/>}
                    </div>
    </Layout>
    </div>);
}