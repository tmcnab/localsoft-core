import s2s from 'graphql-s2s'
import tools from 'graphql-tools'

import Person from './Person'


const schema = `
	type Mutation {

	}

	type Query {

	}

	type Thing {
		description: String
		identifier: ID!
	}

	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const resolvers = {
	Person: Person.resolvers,
	Mutation: {
		...Person.mutations,
	},
    Query: {
		...Person.queries,
	},
}


export default tools.makeExecutableSchema({
	resolvers,
	typeDefs: [s2s.graphqls2s.transpileSchema(schema)],
})
