import User from './User'

export default {
	Mutation: {
		...User.Mutation,
	},
	Query: {
		...User.Query,
	},
}
