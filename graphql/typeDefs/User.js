export default `

	type User {
		email: String!
		hash: String!
		verified: Boolean!
	}

	extend type Mutation {
		authenticateUser (email: String!, password: String!): Boolean!
		deauthenticateUser: Boolean
	}

	extend type Query {
		allUsers: [User]!
		currentUser: User
		findUsers (keywords: String, verified: Boolean): [User]!
	}

`
