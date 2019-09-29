import axios from 'axios'

const buildUrl = (req) => {
	if (req) {
		const protocol = req.headers['x-forwarded-proto']
		const host = req.headers['x-forwarded-host']
		return `${protocol}://${host}/api/graphql`
	}
	return '/api/graphql'
}

const execute = async (url, query, variables) =>
	(await axios.post(url, { query, variables })).data.data

export default ({
	fromClient: async (query, variables) =>
		await execute(buildUrl(), query, variables),
	fromServer: async (req, query, variables) =>
		await execute(buildUrl(req), query, variables),
})
