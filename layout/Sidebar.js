import {Icon, Layout, Menu} from 'antd'
import Link from 'next/link'
import {Component} from 'react'
import './Sidebar.css'

export default class Sidebar extends Component {

	state = {
		collapsed: true,
	}

	#onCollapse = () =>
		this.setState({collapsed: !this.state.collapsed})

	render = () =>
		<Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.#onCollapse}>
			<Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
				<Menu.Item key='/people'>
					<Link href='/people'>
						<>
							<Icon type='user' />
							<span>People</span>
						</>
					</Link>
				</Menu.Item>
				<Menu.Item key='2'>
					<Icon type='video-camera' />
					<span>nav 2</span>
				</Menu.Item>
				<Menu.Item key='3'>
					<Icon type='upload' />
					<span>nav 3</span>
				</Menu.Item>
			</Menu>
		</Layout.Sider>

}
