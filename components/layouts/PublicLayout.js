import {Component} from 'react'
import Head from 'next/head'
import {node, string} from 'prop-types'
import {Layout, Menu} from 'antd'

export default class PublicLayout extends Component {

	static propTypes = {
		children: node.isRequired,
		title: string.isRequired,
	}

	render = () =>
		<>
			<Head>
				<meta content='width=device-width, initial-scale=1' name='viewport' />
				<title>{this.props.title}</title>
			</Head>
			<Layout>
				<Layout.Header>
					<Menu mode='horizontal' theme='dark'>
						<Menu.Item key='/'>Home</Menu.Item>
						<Menu.Item key='/chat'>Chat</Menu.Item>
						<Menu.Item key='/discussions'>Discussions</Menu.Item>
					</Menu>
				</Layout.Header>
				<Layout.Content>
					{this.props.children}
				</Layout.Content>
			</Layout>
		</>
}
