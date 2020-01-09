import Router from 'next/router'

export default (ctx) => ({
	get isAuthenticated () {
		return false
	},

	get isServer () {
		return Boolean(ctx.req)
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
