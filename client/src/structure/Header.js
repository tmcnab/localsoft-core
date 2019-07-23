import {bool} from 'propTypes'
import {Layout, Menu} from 'antd'
import React, {Component} from 'react'

export default class Header extends Component {

	static propTypes = {
		hero: bool.isRequired,
		// items
	}

	render = () =>
		<Layout.Header>
			<Menu mode='horizontal' theme='light'>
				<Menu.Item key='/'>Site Name</Menu.Item>
			</Menu>
		</Layout.Header>


}
