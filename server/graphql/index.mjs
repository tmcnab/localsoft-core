import Account from './Account'
import config from '../config'
import Email from './Email'
import expressGraphQL from 'express-graphql'
import File from './File'
import Page from './Page'
import Person from './Person'
import s2s from 'graphql-s2s'
import tools from 'graphql-tools'

const customSchema = `
	scalar Date

	enum Role {
		ANONYMOUS
		MEMBER
		STAFF
		ADMINISTRATOR
	}

	type Record {
		created: Date!
		identifier: ID!
		modified: Date
		tags: [String!]!
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
    Mutation: Object.assign({}, Account.mutations, Email.mutations, File.mutations, Page.mutations, Person.mutations),
    Page: Page.resolvers,
    Person: Person.resolvers,
    Query: Object.assign({}, Account.queries, Email.queries, File.queries, Page.queries, Person.queries),
    Role: {
        ANONYMOUS: 'ANONYMOUS',
        MEMBER: 'MEMBER',
        STAFF: 'STAFF',
        ADMINISTRATOR: 'ADMINISTRATOR'
    }
}

const schema = tools.makeExecutableSchema({
    resolvers,
    typeDefs: [s2s.graphqls2s.transpileSchema(customSchema)]
})

export default {
    registerWith: app =>
        app.use(
            '/graphql',
            expressGraphQL({
                graphiql: !config.PRODUCTION,
                schema
            })
        )
}
