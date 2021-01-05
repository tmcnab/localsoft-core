import { ApolloServer } from 'apollo-server-micro'
import context from 'data/context'
import resolvers from 'data/resolvers'
import typeDefs from 'data/typeDefs'

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