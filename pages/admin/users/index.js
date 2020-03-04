import {} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {PlusOutlined, QuestionOutlined} from '@ant-design/icons'
import Router from 'next/router'
import UsersTable from 'components/admin/users/UsersTable'

export default class AdminUsersPage extends Component {

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		dataSource: UsersTable.propTypes.dataSource,
	}

	extra =
		<>
			<Tooltip title='New User'>
				<Button icon={<PlusOutlined />} onClick={() => Router.push('/admin/accounts/new')} shape='circle' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<UsersTable dataSource={this.props.dataSource} />

	render = () =>
		<DashboardLayout path='/admin/users'>
			<PageHeader extra={this.extra} footer={this.footer} title='Users' />
		</DashboardLayout>

}
