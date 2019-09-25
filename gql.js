import fetch from 'isomorphic-unfetch'

export default async (url, query, variables) => {
	const response = await fetch(url, {
		body: JSON.stringify({ query, variables }),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		method: 'POST',
	})

	return (await response.json()).data
}
