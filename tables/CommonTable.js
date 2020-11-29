import { Table } from 'antd'

export default function CommonTable (props) {
	const { data, error, loading } = props.result

	return <Table 
		bordered
		dataSource={data?.dataSource}
		loading={loading}
		rowKey='id'
		showHeader={data?.dataSource.length > 0}
		size='small'
		{...props}
	/>
}