export const gql = `
	type File {
		contentType: String!
		id: ID!
		name: String!
		path: String!
		# Whether or not the file is publically available (via link).
		public: Boolean!
		tags: [String!]!
	}

	extend type Query {
		# Retrieve a single file by one or more criteria.
		file (id: ID!): File

		# Retrieve a list of files.
		files: [File!]!
	}
`

const file = () => {
	return null
}

const files = () => {
	return []
}

export const resolvers = {
	Mutations: {},
	Query: {
		file,
		files
	},
}
