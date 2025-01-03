export const formatDate = (timestamp) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat(localStorage.getItem('language') || 'en', options);
    return formatter.format(new Date(timestamp));
};

export function formatUptime(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);

    const language = localStorage.getItem('language') || 'en';
    const translations = {
        'en': { d: 'd', h: 'h', m: 'm' },
        'ru': { d: 'д', h: 'ч', m: 'м' },
    };

    const t = translations[language] || translations['en-US'];

    let result = [];
    if (d > 0) result.push(`${d}${t.d}`);
    if (h > 0) result.push(`${h}${t.h}`);
    if (m > 0) result.push(`${m}${t.m}`);

    return result.join(' ') || `0${t.m}`;
}