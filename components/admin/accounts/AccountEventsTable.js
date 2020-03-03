import {arrayOf, shape, string} from 'prop-types'
import {Component} from 'react'
import Format from 'components/Format'
import {Table} from 'antd'


export default class AccountEventsTable extends Component {

	static propTypes = {
		events: arrayOf(shape({
			content: string.isRequired,
			date: string.isRequired,
			tags: arrayOf(string.isRequired).isRequired,
		})).isRequired,
	}

	columns = [{
		render: record => <Format type='timeago' value={new Date(record.date)} />,
		title: 'When',
	}, {
		dataIndex: 'content',
		title: 'What',
	}, {
		render: record => <Format type='tags' value={record} />,
		title: 'Tags',
	}]

	render = () =>
		<Table columns={this.columns} dataSource={this.props.events} rowKey='date' />

}
