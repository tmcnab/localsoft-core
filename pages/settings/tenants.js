import HelpAction from 'actions/HelpAction'
import SettingsLayout from 'layouts/SettingsLayout'
import TenantsTable from 'tables/TenantsTable'
import AddAction from 'actions/AddAction'

export default function TenantsPage () {
	const actions = [
		<AddAction type='Tenant' />,
		<HelpAction topic='Tenants' />,
	]

	return (
		<SettingsLayout actions={actions} title='Tenants'>
			<TenantsTable />
		</SettingsLayout>
	)
}