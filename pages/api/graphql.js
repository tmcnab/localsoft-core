import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-micro'
import { PrismaClient } from '@prisma/client'
import schema from '../../schema'

const prismaClient = new PrismaClient()

const context = ({ req, res }) => {
	return {
		data: prismaClient,
	}
}

const apolloServer = new ApolloServer({
	context,
	schema,
})

export const config = {
	api: {
		bodyParser: false,
	},
}

export default apolloServer.createHandler({
	path: '/api/graphql',
})