import {arrayOf, shape, string} from 'prop-types'
import {Component} from 'react'
import Router from 'next/router'
import {Table} from 'antd'

export default class AccountsTable extends Component {

	static propTypes = {
		dataSource: arrayOf(shape({
			domain: string.isRequired,
			id: string.isRequired,
			name: string.isRequired,
		}).isRequired).isRequired,
	}

	columns = [{
		dataIndex: 'name',
		title: 'Name',
	}, {
		render: record =>
			<a href={`http://${record.domain}`} rel='noopener noreferrer' target='_blank'>
				{record.domain}
			</a>,
		title: 'Domain'
	}]

	onRow = (record) => ({
		onClick: () => Router.push(`/admin/accounts/${record.id}`)
	})

	render = () =>
		<Table
			columns={this.columns}
			dataSource={this.props.dataSource}
			onRow={this.onRow}
			rowKey='id'
			showHeader={this.props.dataSource.length > 0}
		/>

}
