

export default async (query, variables) => {
    return await window.fetch('/graphql', {
        body: JSON.stringify({ query, variables }),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }).then(response => response.json())
}
