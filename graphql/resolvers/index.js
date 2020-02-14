import Page from './Page'
import User from './User'

export default {
	Mutation: {
		...Page.Mutation,
		...User.Mutation,
	},
	Query: {
		...Page.Query,
		...User.Query,
	},
}
