export default `
	type User {
		domains: [String!]!
		email: String!
		hash: String!
		verified: Boolean!
	}

	type MutationResult {
		error: Boolean!
		errorMessage: String
		success: Boolean!
	}

	type AuthenticationResult {
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
	}

`
