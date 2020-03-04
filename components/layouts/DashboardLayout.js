import {
	ApiOutlined, FileOutlined, FolderOutlined, IdcardOutlined, LogoutOutlined,
	MailOutlined, MessageOutlined, TeamOutlined, ToolOutlined, UserOutlined,
	WalletOutlined,
} from '@ant-design/icons'
import {Component} from 'react'
import {Layout, Menu} from 'antd'
import {node, string} from 'prop-types'
import Router from 'next/router'

export default class DashboardLayout extends Component {

	static propTypes = {
		children: node.isRequired,
		path: string.isRequired,
	}

	headerStyle = {
		color: 'white',
	}

	siderStyle = {
		height: '100vh',
	}

	state = {
		collapsed: true,
	}

	title =
		<span>
			<ToolOutlined />
			<span>Administration</span>
		</span>

	onCollapse = (collapsed) =>
		this.setState({collapsed})

	onSelect = ({key}) => {
		switch (key) {
		case '/sign-out': {
			// TODO sign out here
			Router.replace('/')
		} break
		default: {
			Router.push(key)
		} break
		}
	}

	render = () =>
		<>
			<Layout hasSider>
				<Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={this.siderStyle}>
					<div>
						<img alt='' src='https://via.placeholder.com/80' style={{height: 80}} />
					</div>
					<Menu defaultSelectedKeys={[this.props.path]} onSelect={this.onSelect} theme='dark'>
						<Menu.Item key='/pages'>
							<FileOutlined />
							<span>Pages</span>
						</Menu.Item>
						<Menu.Item key='/email'>
							<MailOutlined />
							<span>Email</span>
						</Menu.Item>
						<Menu.Item key='/discussions'>
							<MessageOutlined />
							<span>Discussions</span>
						</Menu.Item>
						<Menu.Item key='/people'>
							<IdcardOutlined />
							<span>People</span>
						</Menu.Item>
						<Menu.Item key='/files'>
							<FolderOutlined />
							<span>Files</span>
						</Menu.Item>
						<Menu.Item key='/finance'>
							<WalletOutlined />
							<span>Finance</span>
						</Menu.Item>
						<Menu.SubMenu key='/admin' title={this.title}>
							<Menu.Item key='/admin/accounts' style={{marginTop: 0}}>
								<TeamOutlined />
								<span>Accounts</span>
							</Menu.Item>
							<Menu.Item key='/admin/users'>
								<UserOutlined />
								<span>Users</span>
							</Menu.Item>
							<Menu.Item key='/api/graphql'>
								<ApiOutlined />
								<span>API</span>
							</Menu.Item>
						</Menu.SubMenu>
						<Menu.Item key='/sign-out'>
							<LogoutOutlined />
							<span>Sign Out</span>
						</Menu.Item>
					</Menu>
				</Layout.Sider>
				<Layout>
					<Layout.Content>
						{this.props.children}
					</Layout.Content>
				</Layout>
			</Layout>
		</>

}
