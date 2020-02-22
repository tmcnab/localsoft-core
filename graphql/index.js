import context from './context'
import resolvers from './resolvers'
import typeDefs from './typeDefs'


export default ({
	allowUndefinedInResolve: false,
	context,
	resolvers,
	resolverValidationOptions: {
		requireResolversForArgs: true,
		requireResolversForAllFields: true,
		requireResolversForResolveType: false,
	},
	typeDefs,
})
