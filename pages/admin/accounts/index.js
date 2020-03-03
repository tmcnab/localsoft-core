import AccountsTable from 'components/admin/accounts/AccountsTable'
import {array} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {PlusOutlined, QuestionOutlined} from '@ant-design/icons'
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

	static propTypes = {
		dataSource: array,
	}

	extra = [
		<Tooltip key='new' title='New Account'>
			<Button icon={<PlusOutlined />} onClick={() => Router.push('/admin/accounts/new')} shape='circle' />
		</Tooltip>,
		<Tooltip key='help' title='Help'>
			<Button disabled icon={<QuestionOutlined />} shape='circle' />
		</Tooltip>,
	]

	footer =
		<AccountsTable dataSource={this.props.dataSource} />

	render = () =>
		<DashboardLayout path='/admin/accounts'>
			<PageHeader extra={this.extra} footer={this.footer} title='Accounts' />
		</DashboardLayout>

}
