const API_URL = import.meta.env.VITE_API_URL;

export function GET({ url }) {
    return fetch(`${API_URL}/${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}

export function POST({ url, body }) {
    return fetch(`${API_URL}/${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
}

export function PATCH({ url, body }) {
    return fetch(`${API_URL}/${url}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
}

export function PUT({ url, body }) {
    return fetch(`${API_URL}/${url}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    });
}

export function DELETE({ url }) {
    return fetch(`${API_URL}/${url}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}
