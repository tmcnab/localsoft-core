import {Button, Form, Icon, Input} from 'antd'
import Page from '../layout/Page'
import React, {Component} from 'react'

export default class SignInPage extends Component {

	onSubmit = (event) => {
		event.preventDefault()
	}

	render = () =>
		<Page title='Sign In'>
			<Form onSubmit={this.onSubmit}>
				<Form.Item>
					<Input placeholder='Email' name='email' prefix={<Icon type='user' />} required type='email' />
				</Form.Item>
				<Form.Item>
					<Input placeholder='Password' name='password' prefix={<Icon type='lock' />} required type='password' />
				</Form.Item>
				<Form.Item>
					<a href='/register'>Register</a>
					<a href='/recover'>Recover</a>
					<Button htmlType='submit' type='primary'>
						Sign In
					</Button>
				</Form.Item>
			</Form>
		</Page>

}
