export default `
	type Page {
		path: String!
		content: String
		contentType: String!
	}

	#extend type Mutation {
	#	savePage
	#}

	extend type Query {
		findPage (path: String): Page
	}

`
