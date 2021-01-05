import { Button, Table, Tooltip } from 'antd'
import { gql } from '@apollo/client'
import { PlusOutlined, QuestionOutlined } from '@ant-design/icons'
import Layout from 'components/Layout'
import Moment from 'react-moment'
import QueryTable from 'components/QueryTable'
import TenantStatusTag from 'components/TenantStatusTag'
import SubdomainLink from 'components/SubdomainLink'

export default function Index () {
	
	const columns = [{
		dataIndex: 'subdomain',
		render: (subdomain) => <SubdomainLink subdomain={subdomain}>{subdomain}</SubdomainLink>,
		title: 'Subdomain',
	}, {
		dataIndex: 'name',
		title: 'Name',
	}, {
		title: 'Accounts',
		render: (record) => <div>{record.metrics.accountCount}</div>
	}, {
		dataIndex: 'status',
		render: status => <TenantStatusTag status={status} />,
		title: 'Status',
	}]

	const extra = [
		<Tooltip key='add' placement='left' title='Add Tenant'>
			<Button icon={<PlusOutlined />} shape='circle' />
		</Tooltip>,
		<Tooltip key='help' placement='bottom' title='Help'>
			<Button icon={<QuestionOutlined />} shape='circle' />
		</Tooltip>,
	]

	const query = gql`
		query {
			dataSource: tenants {
				name
				id
				metrics {
					accountCount
				}
				name
				status
				subdomain
			}
		}
	`

	return (
		<Layout extra={extra} title='Tenants'>
			<QueryTable columns={columns} query={query} />
		</Layout>
	)
}
