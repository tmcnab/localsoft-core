// Customer
// ========
// An Customer represents a customer record (contact, billing, actions etc).
// Only users with the SUPERADMINISTRATOR role may retrieve this information
// en masse, OR, users that are the ADMINISTRATOR of a specific domain may
// retrieve their own record.

export const gql = `
	type CustomerEvent {
		content: String!
		date: Date!
		userVisible: Boolean!
	}

	type Customer {
		domain: String!
		events: [CustomerEvent!]!
		id: ID!
	}

	extend type Query {
		customers: [Customer!]!
	}
`

export const resolvers = {
	Mutation: {},
	Query: {
		customers: async (root, args, ctx) => {
			console.log('customers', await ctx.db.customers.find({}))
			return []
		}
	},
}
