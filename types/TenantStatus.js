import { gql } from '@apollo/client'

const TenantStatus = Object.freeze({
	Active: 'active',
	Inactive: 'inactive',
	Suspended: 'suspended',
})

export const resolvers = {
	TenantStatus,
}

export const typeDefs = gql`
	# The current status of the tenant.
	enum TenantStatus {
		# The tenant is currently being served.
		Active
		# The tenant is not currently being served due to non-payment.
		Inactive
		# The tenant is suspended for other reasons.
		Suspended
	}
`

export default TenantStatus