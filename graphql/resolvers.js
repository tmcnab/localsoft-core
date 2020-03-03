import {resolvers as Account} from 'types/Account'
import {resolvers as Page} from 'types/Page'
import {resolvers as Person} from 'types/Person'
import {resolvers as Settings} from 'types/Settings'
import {resolvers as User} from 'types/User'

export default {
	Mutation: {
		...Account.Mutation,
		...Page.Mutation,
		...Person.Mutation,
		...Settings.Mutation,
		...User.Mutation,
	},
	Query: {
		...Account.Query,
		...Page.Query,
		...Person.Query,
		...Settings.Query,
		...User.Query,
	},
}
