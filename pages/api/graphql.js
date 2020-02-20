import {ApolloServer} from 'apollo-server-micro'
import graphqlConfiguration from '../../graphql'

const server = new ApolloServer(graphqlConfiguration)

export default server.createHandler({
	path: '/api/graphql'
})

export const config = {
	api: {
		bodyParser: false
	}
}
