
export const formatDate = (timestamp) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat(localStorage.getItem('language') || 'en-US', options);
    return formatter.format(new Date(timestamp));
};
