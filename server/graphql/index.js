import Account from './Account.js'
import config from '../config.js'
import Email from './Email.js'
import expressGraphQL from 'express-graphql'
import File from './File.js'
import Page from './Page.js'
import Person from './Person.js'
import PostalAddress from './PostalAddress.js'
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

	${PostalAddress.schema}

	${Account.schema}
	${File.schema}
	${Email.schema}
	${Page.schema}
	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const Mutation = Object.assign({}, Account.mutations, Email.mutations, File.mutations, Page.mutations, Person.mutations)

const Query = Object.assign({}, Account.queries, Email.queries, File.queries, Page.queries, Person.queries)

const resolvers = {
    Account: Account.resolvers,
    Email: Email.resolvers,
    File: File.resolvers,
    Mutation,
    Page: Page.resolvers,
    Person: Person.resolvers,
    Query,
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
