import {array} from 'prop-types'
import {Component} from 'react'
import {Table} from 'antd'

export default class TopicTable extends Component {

	static query = `
		dataSource: {
			tags
			title
		}
	`

	static propTypes = {
		dataSource: array.isRequired
	}

	columns = []

	render = () =>
		<Table
			columns={this.columns}
			showHeader={this.props.dataSource.length > 0}
		/>

}
