import {gql} from 'apollo-server-micro'
import User from './User'

export default gql`

	type Query {
		none: Boolean
	}

	type Mutation {
		none(b: Boolean): Boolean
	}

	${User}
`
