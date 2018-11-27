import Account from './Account'
import File from './File'
import Person from './Person'
import s2s from 'graphql-s2s'
import tools from 'graphql-tools'


const schema = `
	scalar Date

	enum Role {
		ANONYMOUS
		MEMBER
		STAFF
		ADMINISTRATOR
	}

	type Mutation {

	}

	type Query {

	}

	${Account.schema}
	${File.schema}
	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const resolvers = {
	Account: Account.resolvers,
	File: File.resolvers,
	Mutation: {
		...Account.mutations,
		...File.mutations,
		...Person.mutations,
	},
	Person: Person.resolvers,
	Query: {
		...Account.queries,
		...File.queries,
		...Person.queries,
	},
	Role: {
		ANONYMOUS: 'ANONYMOUS',
		MEMBER: 'MEMBER',
		STAFF: 'STAFF',
		ADMINISTRATOR: 'ADMINISTRATOR',
	},
}


export default tools.makeExecutableSchema({
	resolvers,
	typeDefs: [s2s.graphqls2s.transpileSchema(schema)],
})
