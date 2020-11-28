import { Button, Table, Tooltip } from 'antd'
import { PlusOutlined, QuestionOutlined } from '@ant-design/icons'
import AddDomainAction from 'components/settings/domains/AddDomainAction'
import SettingsLayout from 'layouts/SettingsLayout'

export default function DomainsIndex ({}) {
	const actions = [
		<AddDomainAction />,
		<Tooltip placement='bottom' title='Help'>
		  <Button disabled icon={<QuestionOutlined />} shape='circle' />
		</Tooltip>,
	]
	const title = 'Domains'
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