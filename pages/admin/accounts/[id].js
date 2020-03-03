import AccountForm from 'components/admin/accounts/AccountForm'
import AccountEventsTable from 'components/admin/accounts/AccountEventsTable'
import {Button, PageHeader, Tabs, Tooltip} from 'antd'
import {CheckOutlined, DeleteOutlined, QuestionOutlined} from '@ant-design/icons'
import {Component} from 'react'
import contextualize from 'contextualize'
import DashboardLayout from 'components/layouts/DashboardLayout'
import Router from 'next/router'
import {shape, string} from 'prop-types'


export default class AdminCustomersPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const id = ctx.path.split('/').pop()

		return id === 'new' ? {
			account: {
				domain: '',
				events: [],
				id: undefined,
				name: '',
			}
		} : await ctx.gql(`
			query ($id:ID!) {
			  account(byID: $id) {
			    domain
			    events {
			      content
			      date
			      tags
			    }
			    id
			    name
			  }
			}
		`, {id})
	}

	static propTypes = {
		account: shape({
			domain: string.isRequired,
			id: string,
			name: string.isRequired,
		})
	}

	state = {
		account: this.props.account,
	}

	extra = [
		<Tooltip key='save' title='Save Account'>
			<Button disabled icon={<CheckOutlined />} shape='circle' type='primary' />
		</Tooltip>,
		<Tooltip key='delete' title='Delete Account'>
			<Button danger disabled icon={<DeleteOutlined />} shape='circle' type='primary' />
		</Tooltip>,
		<Tooltip key='help' title='Help'>
			<Button disabled icon={<QuestionOutlined />} key='help' shape='circle' />
		</Tooltip>,
	]

	onAccountFormChange = (account) =>
		this.setState({account})

	footer =
		<Tabs defaultActiveKey='details'>
			<Tabs.TabPane key='details' tab='Details'>
				<br />
				<AccountForm account={this.state.account} onChange={this.onAccountFormChange} />
			</Tabs.TabPane>
			<Tabs.TabPane disabled={!this.props.account.id}  key='events' tab='Events'>
				<br />
				<AccountEventsTable events={this.props.account.events} />
			</Tabs.TabPane>
			<Tabs.TabPane key='developer' tab='Developers'>
				<br />
				<pre>
					{JSON.stringify(this.props.account, null, 2)}
				</pre>
			</Tabs.TabPane>
		</Tabs>

	title =
		this.props.account ? 'Editing Account' : 'Creating Account'

	render = () =>
		<DashboardLayout path='/admin/accounts'>
			<PageHeader extra={this.extra} footer={this.footer} onBack={() => Router.back()} title={this.title} />
		</DashboardLayout>

}
