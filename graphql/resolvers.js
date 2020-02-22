import {resolvers as Customer} from 'types/Customer'
import {resolvers as Page} from 'types/Page'
import {resolvers as Person} from 'types/Person'
import {resolvers as Settings} from 'types/Settings'
import {resolvers as User} from 'types/User'

export default {
	Mutation: {
		...Customer.Mutation,
		...Page.Mutation,
		...Person.Mutation,
		...Settings.Mutation,
		...User.Mutation,
	},
	Query: {
		...Customer.Query,
		...Page.Query,
		...Person.Query,
		...Settings.Query,
		...User.Query,
	},
}
