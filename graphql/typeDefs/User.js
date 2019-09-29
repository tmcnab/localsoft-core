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

	extend type Mutation {
		authenticateUser (email: String!, password: String!): MutationResult!
		saveUser(email: String!, password: String!): MutationResult!
		deauthenticateUser: MutationResult!
	}

	extend type Query {
		allUsers: [User]!
		currentUser: User
		findUsers (keywords: String, verified: Boolean): [User]!
	}

`
