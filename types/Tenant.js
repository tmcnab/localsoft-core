import { gql } from '@apollo/client'
import { random, times } from 'lodash'
import faker from 'faker'
import TenantStatus from 'types/TenantStatus'

export const typeDefs = gql`

	"An instance of Localsoft for a single organization or community. Only LS tenant roles may see this type."
	type Tenant {
		"An identifier for this tenant. Unique."
		id: ID!
		"Metrics for this tenant."
		metrics: TenantMetrics!
		"The legal/designated name for the tenant. Unique. Localsoft-Manager+ edit."
		name: String!
		"The current status of the tenant. Derived field."
		status: TenantStatus!
		"The subdomain this tenant exists on. Unique. Localsoft-Manager+ edit."
		subdomain: String!
	}

	"Metrics describing a particular tenant."
	type TenantMetrics {
		"How many accounts are associated with this tenant."
		accountCount: Int!
	}

	extend type Query {
		tenants: [Tenant]!
	}

`

export const resolvers = {
	Query: {
		tenants: async (parent, args, context, info) => {
			return fakeCollection()
		}
	},
	Tenant: {
		metrics: async (tenant, args, context, info) => {
			return {
				accountCount: faker.random.number({ min: 1, max: 1000 }),
			}
		},
		status: async (tenant, args, context, info) => {
			// TODO use tenant.id to determine status
			return faker.random.objectElement(TenantStatus)
		},
	}
}

export const fakeType = () => {
	return {
		id: faker.random.uuid(),
		name: faker.company.companyName(),
		subdomain: faker.internet.domainWord(),
	}
}

export const fakeCollection = (min = 5, max = 50) => {
	const n = faker.random.number({ min, max })
	return times(n, fakeType)
}