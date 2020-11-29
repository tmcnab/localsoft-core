import { gql } from 'apollo-server-micro'
import { createTenant } from 'fakes'

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#findmany
async function tenants (parent, args, { data }, info) {
	// return await data.tenant.findMany()
	return [
		createTenant(),
		createTenant(),
		createTenant(),
		createTenant(),
		createTenant(),
	]
}

export const resolvers = {
    Query: {
        tenants,
    },
}

export const typeDefs = gql`

    type Tenant {
		createdAt: DateTime!
		domain: String!
		subdomain: String!
		id: ID!
    }

    extend type Query {
        tenants: [Tenant!]!
    }

`