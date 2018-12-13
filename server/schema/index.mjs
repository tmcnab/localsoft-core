import Account from './Account'
import Email from './Email'
import File from './File'
import Page from './Page'
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
	${Email.schema}
	${File.schema}
	${Page.schema}
	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const resolvers = {
	Account: Account.resolvers,
	Email: Email.resolvers,
	File: File.resolvers,
	Mutation: {
		...Account.mutations,
		...Email.mutations,
		...File.mutations,
		...Page.mutations,
		...Person.mutations,
	},
	Page: Page.resolvers,
	Person: Person.resolvers,
	Query: {
		...Account.queries,
		...Email.queries,
		...File.queries,
		...Page.queries,
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
