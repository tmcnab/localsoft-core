import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import IndexActions from 'components/IndexActions'
import Layout from 'components/Layout'
import QueryTable from 'components/QueryTable'
import SubdomainLink from 'components/SubdomainLink'
import TenantStatusTag from 'components/TenantStatusTag'

export default function TenantIndex () {
	const router = useRouter()
	
	const columns = [{
		dataIndex: 'subdomain',
		render: (subdomain) => <SubdomainLink subdomain={subdomain}>{subdomain}</SubdomainLink>,
		sorter: (a, b) => a.subdomain.localeCompare(b.subdomain),
		title: 'Subdomain',
		width: '20%',
	}, {
		dataIndex: 'name',
		sorter: (a, b) => a.name.localeCompare(b.name),
		title: 'Name',
	}, {
		title: 'Accounts',
		render: (record) => record.metrics.accountCount,
		sorter: (a, b) => a.metrics.accountCount - b.metrics.accountCount,
		width: '20%',
	}, {
		dataIndex: 'status',
		render: status => <TenantStatusTag status={status} />,
		title: 'Status',
		width: '1%',
	}]

	const extra = <IndexActions />

	const onRow = (record, rowIndex) => ({
		onClick: (event) => router.push(`/tenants/${record.id}`),	
	})

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
			<QueryTable columns={columns} onRow={onRow} query={query} />
		</Layout>
	)
}
