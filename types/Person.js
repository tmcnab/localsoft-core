import uuidv4 from 'uuid/v4'

export const gql = `

	type PostalAddress {
		country: String
		locality: String
		region: String
		postOfficeBox: String
		postalCode: String
		streetAddress: String
	}

	type Person {
		additionalName: String
		address: PostalAddress
		created: Date!
		description: String
		email: String
		familyName: String
		givenName: String
		id: ID!
		lastTouch: Date
		telephone: String
		tags: [String!]!
	}

	extend type Query {
		people: [Person]!
	}
`



export const resolvers = ({
	Mutation: {},
	Query: {
		people: async () => {
			return [{
				id: uuidv4(),
				additionalName: 'John',
				familyName: 'McNab',
				givenName: 'Tristan',
				identifier: '1234567890',
				lastTouch: new Date().toISOString(),
				tags: ['DSA', 'IWW'],
			}]
		}
	},
})
