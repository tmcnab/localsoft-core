const fakePages = [{
	content: 'Hello world',
	contentType: 'text/markdown',
	path: '/',
}, {
	content: 'About Page',
	contentType: 'text/markdown',
	path: '/about',
}]

const findPage = async (_, args, ctx) => {
	console.log('findPage', args, ctx._req.headers.host)
	return fakePages[0]
}

export default ({
	Mutation: {
	},
	Query: {
		findPage,
	}
})
