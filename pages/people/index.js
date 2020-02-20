import {array} from 'prop-types'
import {Button, PageHeader, Table} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import Format from 'components/Format'

export default class PeoplePage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const props = ctx.gql(`{
		  dataSource: people {
		    additionalName
		    familyName
		    givenName
		    identifier
		    tags
		  }
		}`)

		return props
	}

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		dataSource: array,
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

	extra = [
		<Button disabled icon='plus' key='1' shape='circle' />,
		<Button disabled icon='upload' key='2' shape='circle' />,
		<Button disabled icon='setting' key='3' shape='circle' />,
		<Button disabled icon='question' key='4' shape='circle' />,
	]

	state = {
		dataSource: this.props.dataSource,
	}

	render = () =>
		<DashboardLayout path='/people'>
			<PageHeader extra={this.extra} title='People' />
			<Table
				columns={this.columns}
				dataSource={this.state.dataSource}
				rowKey='identifier'
				showHeader={this.state.dataSource.length > 0}
			/>
		</DashboardLayout>

}
