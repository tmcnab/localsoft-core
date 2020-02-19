import {shape, string} from 'prop-types'

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
export const propType = shape({
	content: string,
	contentType: string.isRequired,
	path: string.isRequired,
})
