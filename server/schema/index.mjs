import Person from './Person'
import s2s from 'graphql-s2s'
import tools from 'graphql-tools'


const schema = `
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

	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const resolvers = {
	Mutation: {
		...Person.mutations,
	},
	Person: Person.resolvers,
	Query: {
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
