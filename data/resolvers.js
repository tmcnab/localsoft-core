import {resolvers as Query} from 'types/Query'
import {resolvers as Tenant} from 'types/Tenant'
import {resolvers as TenantStatus} from 'types/TenantStatus'
import deepmerge from 'deepmerge'

export default deepmerge.all([
	Query,
	TenantStatus,
	Tenant,
])