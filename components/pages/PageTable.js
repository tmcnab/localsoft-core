import {arrayOf, shape, string} from 'prop-types'
import {Component} from 'react'
import Format from 'components/Format'
import Router from 'next/router'
import {Table} from 'antd'

export default class PageTable extends Component {

	static query = `
		dataSource: {
			path
			id
			tags
			title
		}
	`
	
	static propTypes = {
		dataSource: arrayOf(shape({
			path: string.isRequired,
			id: string.isRequired,
			tags: arrayOf(string.isRequired).isRequired,
			title: string.isRequired,
		}).isRequired).isRequired,
	}

	columns = [{
		title: 'Title',
	}, {
		title: 'Path',
	}, {
		key: 'tags',
		render: record => <Format type='tags' value={record} />,
		title: 'Tags',
	}]

	onRow = (record) => ({
		onClick: () => Router.push(`/page/${record.id}`)
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
