import AccountForm from 'components/admin/accounts/AccountForm'
import {Button, PageHeader, Tabs} from 'antd'
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
			      userVisible
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
		<Button disabled icon={<CheckOutlined />} key='save' shape='circle' type='primary' />,
		<Button danger disabled icon={<DeleteOutlined />} key='delete' shape='circle' type='primary' />,
		<Button disabled icon={<QuestionOutlined />} key='help' shape='circle' />,
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
				Events Here
			</Tabs.TabPane>
			<Tabs.TabPane key='developer' tab='Developers'>
				<br />
				<pre>{JSON.stringify(this.props.account, null, 2)}</pre>
			</Tabs.TabPane>
		</Tabs>

	title =
		this.props.account ? 'Editing Account' : 'Creating Account'

	render = () =>
		<DashboardLayout path='/admin/accounts'>
			<PageHeader extra={this.extra} footer={this.footer} onBack={() => Router.back()} title={this.title} />
		</DashboardLayout>

}
