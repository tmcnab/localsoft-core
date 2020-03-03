/* Account
========
An Account represents a customer record (contact, billing, actions etc). Only
users with the SUPERADMINISTRATOR role may retrieve this information en masse,
OR, users that are the ADMINISTRATOR of a specific domain may retrieve their
own record.

Record Structure
----------------
```
Account: {
	domain: String!
	events: [AccountEvent!]!
	visibility: Role!
}

AccountEvent {
	content: String!
	date: Date!
	tags: [String!]!
}
```
*/
import uuidv4 from 'uuid/v4'

export const gql = `
	type AccountEvent {
		content: String!
		date: Date!
		tags: [String!]!
	}

	type Account {
		domain: String!
		events: [AccountEvent!]!
		id: ID!
		name: String!
	}

	input AccountInput {
		domain: String!
		id: ID
		name: String!
	}

	extend type Mutation {
		saveAccount (input: AccountInput!): SaveResult!
	}

	extend type Query {
		account (byID: ID): Account
		accounts: [Account!]!
	}
`

export const resolvers = {
	Mutation: {
		saveAccount: () => {
			return {
				error: null,
				id: uuidv4(),
			}
		}
	},
	Query: {
		account: (_, {byID}, ctx) => {
			return ctx.db.admin.get('accounts').find({id: byID}).value()
		},
		accounts: (root, args, ctx) => {
			return ctx.db.admin.get('accounts').value()
		}
	},
}
