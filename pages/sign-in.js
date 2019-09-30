import {Col, Row, Tabs} from 'antd'
import Page from 'layout/Page'
import React, {Component} from 'react'
import SignInForm from 'uniques/sign-in/SignInForm'
import RecoverForm from 'uniques/sign-in/RecoverForm'
import RegisterForm from 'uniques/sign-in/RegisterForm'

export default class SignInPage extends Component {

	onSubmit = (event) => {
		event.preventDefault()
	}

	state = {
		canRegister: false,
		defaultActiveKey: null,
	}

	#colProps = {
		xs: {span: 24, offset: 0},
		sm: {span: 18, offset: 3},
		md: {span: 14, offset: 5},
		lg: {span: 12, offset: 6},
		xl: {span: 10, offset: 7},
	}

	componentDidMount = () =>
		this.setState({defaultActiveKey: window.location.pathname})

	render = () =>
		<Page title='Sign In'>
			<Row>
				<Col {...this.#colProps}>
					<Tabs defaultActiveKey={this.state.defaultActiveKey}>
						<Tabs.TabPane tab="Enter" key="/sign-in">
							<SignInForm onSubmit={this.onSignInSubmit} />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Register" key="/register">
							<RegisterForm />
						</Tabs.TabPane>
						<Tabs.TabPane tab="Recover" key="/recover">
							<RecoverForm />
						</Tabs.TabPane>
					</Tabs>
				</Col>
			</Row>
		</Page>

}
