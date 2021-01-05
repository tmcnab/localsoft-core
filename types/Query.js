import { gql } from '@apollo/client'

export const resolvers = {
	Query: {
		empty: () => null
	},
}

export const typeDefs = gql`
	type Query {
		empty: Boolean
	}
`

