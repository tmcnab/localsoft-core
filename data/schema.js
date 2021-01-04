import { gql } from "apollo-server-micro";

export const context = async () => {
	return {}
}

export const resolvers = {
	Query: {
		users(parent, args, context) {
			return [{ name: 'Nextjs' }]
		},
	},
}

export const typeDefs = gql`
	type Query {
		users: [User!]!
	}
	type User {
		name: String
	}
`

