import {Component} from 'react'
import {Icon, Layout, Menu} from 'antd'
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
						<Menu.Item key='/people' style={{marginTop: 0}}>
							<Icon type='user' />
							<span>People</span>
						</Menu.Item>
						<Menu.Item key='/sign-out'>
							<Icon type='logout' />
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