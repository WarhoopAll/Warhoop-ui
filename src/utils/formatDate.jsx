export const formatDate = (timestamp) => {
    if (!timestamp) return 'Invalid date';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
    };

    const language = localStorage.getItem('language') || 'en';

    try {
        const formatter = new Intl.DateTimeFormat(language, options);
        return formatter.format(new Date(timestamp));
    } catch (error) {
        console.error('Date formatting error:', error);
        return new Date(timestamp).toISOString().replace('T', ' ').slice(0, 16);
    }
};


export function formatUptime(starttime) {
    const currentTime = Math.floor(Date.now() / 1000);
    const elapsedSeconds = currentTime - starttime;

    const d = Math.floor(elapsedSeconds / (3600 * 24));
    const h = Math.floor((elapsedSeconds % (3600 * 24)) / 3600);
    const m = Math.floor((elapsedSeconds % 3600) / 60);

    const language = localStorage.getItem('language') || 'en';
    const translations = {
        'en': { d: 'd', h: 'h', m: 'm' },
        'ru': { d: 'д', h: 'ч', m: 'м' },
    };

    const t = translations[language] || translations['en'];

    let result = [];
    if (d > 0) result.push(`${d}${t.d}`);
    if (h > 0) result.push(`${h}${t.h}`);
    if (m > 0) result.push(`${m}${t.m}`);

    return result.join(' ') || `0${t.m}`;
}
