import Tenants from './Tenants.md'

export default function help (topic) {
	return {
		Tenants,
	}[topic]
}