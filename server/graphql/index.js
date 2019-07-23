import config from '../config.js'
import debug from 'debug'
import expressGraphQL from 'express-graphql'
import Person from './Person.js'
import PostalAddress from './PostalAddress.js'
import {Roles} from '../enums.js'
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
	${Person.schema}

	schema {
		query: Query
		mutation: Mutation
	}
`

const Mutation = Object.assign({}, Person.mutations)

const Query = Object.assign({}, Person.queries)

const resolvers = {
    Mutation,
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

// TODO until I work out dotenv
debug.enable('localsoft')

export default {
    registerWith: app =>
        app.use(
            '/graphql',
            expressGraphQL({
                graphiql: !config.PRODUCTION,
                rootValue: {
                    debug: debug('localsoft'),
                    Roles
                },
                schema
            })
        )
}
