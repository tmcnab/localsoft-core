import axios from 'axios'

const executeGraphQL = async (url, query, variables) =>
	(await axios.post(url, { query, variables })).data.data

export default async (query, variables) => {
	const url = '/api/graphql'
	return await executeGraphQL(url, query, variables)
}
