export const gql = `

	type PostalAddress {
		country: String
		locality: String
		region: String
		postOfficeBox: String
		postalCode: String
		streetAddress: String
	}

	type Person implements Record {
			created: Date!
			description: String
			identifier: ID!
			tags: [String!]!

			additionalName: String
			address: PostalAddress
			email: String
			familyName: String
			givenName: String
			lastTouch: Date
			telephone: String
	}

	extend type Query {
		people: [Person]!
	}

`

const people = async () => {
	return [{
		additionalName: 'John',
		familyName: 'McNab',
		givenName: 'Tristan',
		identifier: '1234567890',
		tags: ['DSA', 'IWW'],
	}]
}

export const resolvers = ({
	Mutation: {},
	Query: {
		people,
	},
})
