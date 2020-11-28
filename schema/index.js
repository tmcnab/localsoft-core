import { makeExecutableSchema } from 'apollo-server-micro'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

export default makeExecutableSchema({
	resolvers,
	typeDefs,
})