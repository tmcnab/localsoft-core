import {array} from 'prop-types'
import {Button, PageHeader, Table} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import Link from 'next/link'

export default class AdminCustomersPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const props = await ctx.gql(`{
		  dataSource: customers {
		    domain
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
		key: 'Domain',
		render: record => <Link href={record.domain}>{record.domain}</Link>,
		title: 'Name',
	}]

	extra = [
		<Button disabled icon='plus' key='1' shape='circle' />,
		<Button disabled icon='question' key='4' shape='circle' />,
	]

	state = {
		dataSource: this.props.dataSource,
	}

	render = () =>
		<DashboardLayout path='/admin/customers'>
			<PageHeader extra={this.extra} title='Customers' />
			<Table
				columns={this.columns}
				dataSource={this.state.dataSource}
				rowKey='identifier'
				showHeader={this.state.dataSource.length > 0}
			/>
		</DashboardLayout>

}
