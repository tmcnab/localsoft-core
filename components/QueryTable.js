import { Table } from 'antd'
import { useQuery } from '@apollo/client'

export default function QueryTable ({ query, variables, ...props }) {
	const { data, error, loading } = useQuery(query, {
		variables
	})

	const tableProps = Object.assign({
		pagination: { 
			hideOnSinglePage: true,
		},
		rowKey: 'id',
		size: 'small',
	}, props, {
		dataSource: data?.dataSource,
		loading,
	})

	return <Table {...tableProps} />
}