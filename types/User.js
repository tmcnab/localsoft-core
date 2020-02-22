export const gql = `

	type User {
		created: Date!
		domains: [String!]!
		email: String!
		hash: String!
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
		authenticate (email: String!, password: String!): AuthenticationResult!
		saveUser(email: String!, password: String!): MutationResult!
		deauthenticateUser: MutationResult!
	}

	extend type Query {
		allUsers: [User]!
		currentUser: User
		findUsers (keywords: String, verified: Boolean): [User]!
	}`

export const resolvers = ({
	Mutation: {
		authenticate: async (root, args, ctx) => {
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
	},
	Query: {}
})
