import { gql, useQuery } from '@apollo/client'
import CommonTable from './CommonTable'
import TimeSince from 'components/TimeSince'

export default function TenantsTable ({ }) {

	const columns = [{
		dataIndex: 'subdomain',
		title: 'Subdomain',
	}, {
		dataIndex: 'domain',
		title: 'Alias Domain',
	}, {
		dataIndex: 'createdAt',
		render: (date) => <TimeSince date={date} />,
		title: 'Age',
	}]
	
	const result = useQuery(gql`
		query {
			dataSource: tenants {
				createdAt
				domain
				id
				subdomain
			}
		}
	`)
	
	return <CommonTable columns={columns} result={result} />
}