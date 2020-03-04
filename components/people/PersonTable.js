import {arrayOf, shape, string} from 'prop-types'
import {Component} from 'react'
import Format from 'components/Format'
import Router from 'next/router'
import {Table} from 'antd'

export default class PersonTable extends Component {

	static query = `
		dataSource: {
			additionalName
			familyName
			givenName
			id
			lastTouch
			tags
		}
	`

	static propTypes = {
		dataSource: arrayOf(shape({
			additionalName: string,
			familyName: string,
			givenName: string,
			id: string.isRequired,
			lastTouch: string,
			tags: arrayOf(string.isRequired).isRequired,
		}).isRequired).isRequired,
	}

	columns = [{
		key: 'name',
		render: record => <Format type='shortname' value={record} />,
		title: 'Name',
	}, {
		key: 'lastTouch',
		render: record => <Format type='timeago' value={record.lastTouch} />,
		title: 'Last Touch',
	}, {
		key: 'role',
		render: () => <span>TBA</span>,
		title: 'Role',
	}, {
		key: 'tags',
		render: record => <Format type='tags' value={record} />,
		title: 'Tags',
	}]

	onRow = (record) => ({
		onClick: () => Router.push(`/people/${record.id}`)
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
