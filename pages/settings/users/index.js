import { Button, Table, Tooltip } from 'antd'
import { PlusOutlined, QuestionOutlined } from '@ant-design/icons'
import TimeSince from 'components/TimeSince'
import { useRouter } from 'next/router'
import SettingsLayout from 'layouts/SettingsLayout'

export default function UserIndex ({}) {
	const router = useRouter()

	const columns = [{
		dataIndex: 'email',
		title: 'Email',
	}, {
		dataIndex: 'createdAt',
		defaultSortOrder: 'descend',
		render: (date) => <TimeSince date={date} />,
		title: 'Age',
	}]

	const extra = [
		<Tooltip placement='left' title='Add User'>
			<Button disabled icon={<PlusOutlined />} shape='circle' />
		</Tooltip>,
		<Tooltip placement='bottom' title='Help'>
			<Button disabled icon={<QuestionOutlined />} shape='circle' />
		</Tooltip>,
	]

	const loading = false

	const dataSource = [{
		createdAt: '2020-11-27T02:00:00.000Z',
		email: 'user@domain.tld',
		id: '123456567788',
	}, { 
		createdAt: '2019-11-25T02:00:00.000Z',
		email: 'something@acme.com',
		id: '0987654321',
	}]

	const onBack = () => 
		router.push('/settings')

	const rowKey = 'id'
	
	const showHeader = Boolean(dataSource.length)

	const sticky = true

	return (
		<SettingsLayout extra={extra} onBack={onBack} title='Users'>
			<Table 
				columns={columns} 
				dataSource={dataSource} 
				loading={loading}
				rowKey={rowKey}
				showHeader={showHeader}
				size='small'
				sticky={sticky}
			/>
		</SettingsLayout>
	)
}