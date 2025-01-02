import OnlineTableItem from "@/partials/online/OnlineTableItem";

export default function OnlineTable({characters, images, t}) {
    return (
        <div className="text-customTXT ">
            <div className="overflow-hidden shadow-lg w-full">
                <div
                    className="bg-customBg grid grid-cols-7 mb-4 py-3 rounded-lg border border-customBrown uppercase font-semibold">
                    <div className="text-center ">{t("Other.Name")}</div>
                    <div className="text-center">{t("Other.Level")}</div>
                    <div className="text-center">{t("Other.Race")}</div>
                    <div className="text-center">{t("Other.Class")}</div>
                    <div className="text-center">{t("Other.Faction")}</div>
                    <div className="text-center">{t("Other.Map")}</div>
                    <div className="text-center">{t("Other.Zone")}</div>
                </div>
                <div className="rounded-lg">
                    {characters?.map((character,index) => {
                        const imageGender = `${character?.race}_${character?.gender}`;
                            const factionImage = [2, 5, 6, 8, 10].includes(character?.race) ? images.factions.HordeImage : images.factions.AllianceImage;
                            return (
                                <OnlineTableItem
                                    key={index} {...character}
                                    name={character?.name}
                                    mapRu={character?.map?.map_lang_ru}
                                    mapEn={character?.map?.map_lang_en}
                                    zoneEn={character?.zone?.zone_lang_en}
                                    zoneRu={character?.zone?.zone_lang_ru}
                                    level={character?.level}
                                    classimage={images?.classImages[character.class]}
                                    raceimage={images?.raceGenderImages[imageGender]}
                                    faction={factionImage}
                                    images={images}
                                    race={character.race}
                                    class={character.class}
                                />
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

