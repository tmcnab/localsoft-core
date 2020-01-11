import Router from 'next/router'

export default ({ctx}) => ({

	can: {
		read: {
			people: true,
			settings: true,
			signIn: true,
		},
	},

	is: {
		authenticated: true,
		get server () {
			return  Boolean(ctx.req)
		},
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
