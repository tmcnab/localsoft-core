import axios from 'axios'
import Router from 'next/router'

const buildGraphQLUrl = (req) => {
	if (req) {
		const protocol = req.headers['x-forwarded-proto']
		const host = req.headers.host || req.headers['x-forwarded-host']
		return `${protocol}://${host}/api/graphql`
	}
	return '/api/graphql'
}

const executeGraphQL = async (url, query, variables) =>
	(await axios.post(url, { query, variables })).data.data

export default (ctx) => ({

	can: {
		read: {
			people: true,
			settings: true,
			signIn: true,
		},
	},

	get path () {
		return ctx.req.url
	},

	is: {
		authenticated: true,
		get server () {
			return  Boolean(ctx.req)
		},
	},

	async gql (query, variables) {
		const url = buildGraphQLUrl(ctx.req)
		return await executeGraphQL(url, query, variables)
	},

	redirect (path) {
		if (ctx.req) {
			ctx.res.writeHead(302, {
				Location: path,
			}).end()
		} else {
			Router.push(path)
		}
	},

})
