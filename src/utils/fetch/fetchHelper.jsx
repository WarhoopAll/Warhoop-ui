import config from '/config.json'

export function GET({url}) {
    return (fetch(config.App + url, {
            method: "GET", headers: {
                "Content-Type": "application/json",
            }, credentials: 'include',
        }))
}

export function POST({url, body}) {
    return (fetch(config.App + url, {
            method: "POST", headers: {
                "Content-Type": "application/json",
            }, credentials: 'include', body: JSON.stringify(body)
        }))
}

export function PATCH({url, body}) {
    return (fetch(config.App + url, {
            method: "PATCH", headers: {
                "Content-Type": "application/json",
            }, credentials: 'include', body: JSON.stringify(body)
        }))
}

export function PUT({url, body}) {
    return (fetch(config.App + url, {
            method: "PATCH", headers: {
                "Content-Type": "application/json",
            }, credentials: 'include', body: JSON.stringify(body)
        }))
}

export function DELETE({url}) {
    return (fetch(config.App + url, {
            method: "DELETE", headers: {
                "Content-Type": "application/json",
            }, credentials: 'include',
        }))
}