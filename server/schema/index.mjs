import s2s from 'graphql-s2s'
import tools from 'graphql-tools'

import Person from './Person'
import Query from './Query'


const schema = `
	type Thing {
		description: String
		identifier: ID!
	}
	${Person.schema}
	${Query.schema}
`

const resolvers = {
	Person: Person.resolvers,
    Query: Query.resolvers,
}


export default tools.makeExecutableSchema({
	resolvers,
	typeDefs: [s2s.graphqls2s.transpileSchema(schema)],
})
