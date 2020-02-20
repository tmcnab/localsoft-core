import {gql} from 'apollo-server-micro'
import {gql as Page} from './types/Page'
import {gql as Person} from './types/Person'
import {gql as Settings} from './types/Settings'
import {gql as User} from './types/User'

export default gql`

	scalar Date

	type Query
	type Mutation

	interface Record {
		created: Date!
		description: String
		identifier: ID!
		tags: [String!]!
	}

	${Page}
	${Person}
	${Settings}
	${User}
`
