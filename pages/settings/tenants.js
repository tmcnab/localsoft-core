import SettingsLayout from 'layouts/SettingsLayout'
import TenantsTable from 'tables/TenantsTable'

export default function TenantsPage () {
	return (
		<SettingsLayout title='Tenants'>
			<TenantsTable />
		</SettingsLayout>
	)
}