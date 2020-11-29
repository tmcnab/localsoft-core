import Tenant from './TenantForm'

export default function forms (type) {
	return {
		Tenant,
	}[type]
}