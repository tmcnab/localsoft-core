import {Layout, Menu} from 'antd'
import {createEnum} from '../enums'
import Link from 'next/link'
import {Component} from 'react'
import './Header.css'

export default class Header extends Component {

	static Type = createEnum('Hero', 'None', 'Simple')

	static propTypes = {
		type: Header.Type.validator.isRequired,
	}

	state = {
		defaultSelectedKeys: null
	}

	componentDidMount = () =>
		this.setState({defaultSelectedKeys: window.location.pathname})

	render = () => ({
		[Header.Type.Hero]: null,
		[Header.Type.None]: <></>,
		[Header.Type.Simple]:
			<Layout.Header>
				<Menu defaultSelectedKeys={[this.state.defaultSelectedKeys]} mode='horizontal'>
					<Menu.Item key='/'>
						<Link href='/'>
							<a>Home</a>
						</Link>
					</Menu.Item>
					<Menu.Item key='/sign-in'>
						<Link href='/sign-in'>
							<a>Sign In</a>
						</Link>
					</Menu.Item>
				</Menu>
			</Layout.Header>,
	})[this.props.type]
}
