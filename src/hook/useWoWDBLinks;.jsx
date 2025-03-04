const processTextWithTooltips = (text) => {
    if (!text) return "";

    const locale = localStorage.getItem("language") || "en";
    const baseUrl = import.meta.env.VITE_OAWOW_URL?.replace(/\/$/, "");

    const urlRegex = new RegExp(`${baseUrl?.replace(/\./g, "\\.")}/\\?(item|npc|quest|spell|pet|achievement|zone|title)=(\\d+)`, "g");
    return text.replace(urlRegex, (match, type, id) => {
        const newUrl = `${baseUrl}/?${type}=${id}&domain=${locale}`;
        return `<a href="${newUrl}">${match}</a>`;
    });
};

export default processTextWithTooltips;
