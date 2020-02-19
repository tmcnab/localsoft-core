import {Button, Form, Input} from 'antd'
import {Component} from 'react'
import ErrorAlert from './ErrorAlert'
import {func} from 'prop-types'
import gql from 'gql'

export default class SignInForm extends Component {

	static propTypes = {
		onSuccess: func.isRequired,
	}

	state = {
		errorMessage: null,
	}

	onSubmit = async (event) => {
		event.preventDefault()
		const variables = {
			email: event.target.email.value,
			password: event.target.password.value,
		}

		const {authenticate} = await gql(`
			mutation ($email: String!, $password: String!) {
			  authenticate (email: $email, password: $password) {
					authorization
			    errorMessage
			    success
			  }
			}
		`, variables)

		this.setState(authenticate, () => {
			if (authenticate.success) {
				window.localStorage.setItem('authorization', authenticate.authorization)
				this.props.onSuccess()
			}
		})
	}

	render = () =>
		<>
			<ErrorAlert message={this.state.errorMessage} />
			<Form onSubmit={this.onSubmit}>
				<Form.Item colon={false} label='Email Address'>
					<Input name='email' placeholder='user@domain.tld' required type='email' />
				</Form.Item>
				<Form.Item colon={false} label='Password'>
					<Input name='password' placeholder='********' required type='password' />
				</Form.Item>
				<Form.Item>
					<Button block htmlType='submit' type='primary'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>

}
