import { ApolloServer } from 'apollo-server-micro'
import { context, resolvers, typeDefs } from '../../data/schema.js'

const apolloServer = new ApolloServer({ 
	context,
	resolvers,
	typeDefs,
})

export default apolloServer.createHandler({
	path: '/api/graphql',
})

export const config = {
	api: {
		bodyParser: false,
	},
}