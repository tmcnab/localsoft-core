import EditActions from 'components/EditActions'
import Layout from 'components/Layout'
import { useRouter } from 'next/router'

export default function TenantEdit (props) {
	const router = useRouter()
	
	const extra = <EditActions />
	const onBack = () => router.push('/tenants')

	return (
		<Layout extra={extra} onBack={onBack} title='Tenant'>
			<p>View Tenant</p>
		</Layout>
	)
}
