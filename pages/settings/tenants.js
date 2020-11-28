import { Button, Table, Tooltip } from 'antd'
import { QuestionOutlined } from '@ant-design/icons'
import AddDomainAction from 'components/settings/tenants/AddDomainAction'
import SettingsLayout from 'layouts/SettingsLayout'

export default function TenantsIndex ({}) {
	const actions = [
		<AddDomainAction />,
		<Tooltip placement='bottom' title='Help'>
		  <Button disabled icon={<QuestionOutlined />} shape='circle' />
		</Tooltip>,
	]
	const title = 'Tenants'
	const settingsLayout = { actions, title }
	
	const dataSource = []
	const showHeader = Boolean(dataSource.length)
	const table = { dataSource, showHeader }
	
	return (
	  <SettingsLayout {...settingsLayout}>
		<Table {...table} />
	  </SettingsLayout>
	)
}