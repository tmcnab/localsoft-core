export const gql = `

type Page implements Record {
	created: Date!
	description: String
	identifier: ID!
	tags: [String!]!

	content: String
	contentType: String!
	path: String!
	title: String!
}

extend type Query {
	# Finds a single page matching the provided criterion and ACL.
	page (path: String): Page
	pages: [Page]!
}

`

const page = async () => {
	return {
		created: (new Date()).toISOString(),
		identifier: '123132132123123',
		tags: [],
		content: `
Hello World
===========

This is the public index page.
`,
		contentType: 'text/markdown',
		path: '/',
		title: 'Home',
	}
}

const pages = async () => {
	return []
}

export const resolvers = ({
	Mutation: {},
	Query: {
		page,
		pages,
	},
})
