import {array} from 'prop-types'
import {Button, PageHeader, Table} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import Router from 'next/router'

export default class AdminCustomersPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		return await ctx.gql(`{
		  dataSource: accounts {
		    domain
				id
				name
		  }
		}`)
	}

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		dataSource: array,
	}

	columns = [{
		dataIndex: 'name',
		key: 'name',
		title: 'Name',
	}, {
		key: 'domain',
		render: record =>
			<a href={`http://${record.domain}`} rel='noopener noreferrer' target='_blank'>
				{record.domain}
			</a>,
		title: 'Domain'
	}]

	extra = [
		<Button icon='plus' key='1' onClick={() => Router.push('/admin/accounts/new')} shape='circle' />,
		<Button disabled icon='question' key='4' shape='circle' />,
	]

	state = {
		dataSource: this.props.dataSource,
	}

	onRow = (record) => ({
		onClick: () => Router.push(`/admin/accounts/${record.id}`)
	})

	render = () =>
		<DashboardLayout path='/admin/accounts'>
			<PageHeader extra={this.extra} title='Customers' />
			<Table
				columns={this.columns}
				dataSource={this.state.dataSource}
				onRow={this.onRow}
				rowKey='id'
				showHeader={this.state.dataSource.length > 0}
			/>
		</DashboardLayout>

}
