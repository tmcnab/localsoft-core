import {get} from 'lodash'

export default async (query, variables) => {
    const configuration = {
        body: JSON.stringify({ query, variables }),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    }

    return await window.fetch('/graphql', configuration)
        .then(response => response.json())
        .then(response => get(response, 'data', null))
        .catch(response => get(response, 'errors', null))
}


export const patch = async (resource, data) => {
    const configuration = {
        body: JSON.stringify(data),
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PATCH',
    }

    return await window.fetch(`/${resource}/`, configuration)
        .then(response => response.json())
}
