/**
	A User corresponds to a single human in meatspace that has access to one or
	more domains.

	User: {
		created: Date!
		domains: [String!]!
		id: ID!
		schemes: {
			email: {
				email: String!
				hash: String!
				verified: Date
			}
		}
	}
**/

export const gql = `

	type User {
		created: Date!
		domains: [String!]!
		id: ID!
		schemes: [AuthenticationScheme]!
	}

	interface MutationResult {
		error: Boolean!
		errorMessage: String
		success: Boolean!
	}

	type AuthenticationResult implements MutationResult {
		authorization: String
		error: Boolean!
		errorMessage: String
		success: Boolean!
	}

	extend type Mutation {
		authenticate (email: String, password: String): AuthenticationResult!
		deauthenticate: Boolean!
	}

	extend type Query {
		findUser (byID: ID, byDomain: String): User
		users: [User!]!
	}`

// eslint-disable-next-line
const findUser = async (root, args, ctx) => {
	return null
}

// eslint-disable-next-line
const users = async (root, args, ctx) => {
	return []
}

const authenticate = async (root, args, ctx) => {
	// If user is already authenticated just return authorization.
	if (ctx.authenticated) {
		return {
			authorization: ctx.authorization,
			error: false,
			errorMessage: '',
			success: true,
		}
	}

	return {
		authorization: null,
		error: true,
		errorMessage: 'Not Implemented',
		success: false,
	}
}

// eslint-disable-next-line
const deauthenticate = async (root, args, ctx) =>  {
	return false
}

export const resolvers = ({
	Mutation: {
		authenticate,
		deauthenticate,
	},
	Query: {
		findUser,
		users,
	}
})
