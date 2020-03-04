import {arrayOf, shape, string} from 'prop-types'
import {authenticationSchemePropType} from 'types/AuthenticationScheme'
import {Component} from 'react'
import Router from 'next/router'
import {Table} from 'antd'

export default class UsersTable extends Component {

	static propTypes = {
		dataSource: arrayOf(shape({
			created: string.isRequired,
			domains: arrayOf(string.isRequired).isRequired,
			id: string.isRequired,
			schemes: arrayOf(authenticationSchemePropType).isRequired,
		}).isRequired).isRequired,
	}

	columns = [{
		dataIndex: 'id',
		title: 'Identifier',
	}, {
		dataIndex: 'domains',
		title: 'Domains',
	}, {
		dataIndex: 'created',
		title: 'Created',
	}, {
		dataIndex: 'schemes',
		title: 'Authentication Schemes',
	}]

	onRow = (record) => ({
		onClick: () => Router.push(`/admin/users/${record.id}`)
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
