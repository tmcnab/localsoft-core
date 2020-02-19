import {Card, Col, Icon, Row, Tooltip} from 'antd'
import {Component} from 'react'
import Link from 'next/Link'
import SignInForm from 'components/sign-in/SignInForm'
import SimpleLayout from 'components/layouts/SimpleLayout'

export default class SignInPage extends Component {

	static title = 'Sign In'

	children = {
		'1': <SignInForm onSuccess={this.onSignInSuccess} />,
		'2': <p>Register</p>,
		'3': <p>Recover</p>,
	}

	onSignInSuccess = () =>
		window.alert('Signed in!')

	onTabChange = (activeTabKey) =>
		this.setState({activeTabKey})

	state = {
		activeTabKey: '1',
	}

	tabBarExtraContent =
		<Link href='/help/sign-in'>
			<Tooltip title='Help Article'>
				<Icon type="question-circle" />
			</Tooltip>
		</Link>

	tabList = [
		{ key: '1', tab: 'Sign In' },
		{ key: '2', tab: 'Register' },
		{ key: '3', tab: 'Recover' },
	]

	render = () =>
		<SimpleLayout title='Authenticate'>
			<Row>
				<Col offset={8} span={8}>
					<Card activeTabKey={this.state.activeTabKey} bordered tabBarExtraContent={this.tabBarExtraContent} onTabChange={this.onTabChange} tabList={this.tabList}>
						{this.children[this.state.activeTabKey]}
					</Card>
				</Col>
			</Row>
		</SimpleLayout>


}
