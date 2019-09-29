import {ApolloServer} from 'apollo-server-micro'
import context from '../../graphql/context'
import resolvers from '../../graphql/resolvers'
import typeDefs from '../../graphql/typeDefs'

const server = new ApolloServer({
	context,
	resolvers,
	typeDefs,
})

export default server.createHandler({ path: '/api/graphql' })

export const config = {
	api: {
		bodyParser: false
	}
}
