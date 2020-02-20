import {resolvers as Page} from './types/Page'
import {resolvers as Person} from './types/Person'
import {resolvers as User} from './types/User'
import {resolvers as Settings} from './types/Settings'

export default {
	Mutation: {
		...Page.Mutation,
		...Person.Mutation,
		...Settings.Mutation,
		...User.Mutation,
	},
	Query: {
		...Page.Query,
		...Person.Query,
		...Settings.Query,
		...User.Query,
	},
}
