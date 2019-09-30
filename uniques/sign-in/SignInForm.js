import {Button, Form, Icon, Input} from 'antd'
import {Component} from 'react'

export default class SignInForm extends Component {

	#onSubmit = (event) => {
		event.preventDefault()
	}

	render = () =>
		<Form colon={false} onSubmit={this.#onSubmit}>
			<Form.Item label='Email Address'>
				<Input placeholder='Email' name='email' prefix={<Icon type='user' />} required type='email' />
			</Form.Item>
			<Form.Item label='Password'>
				<Input placeholder='Password' name='password' prefix={<Icon type='lock' />} required type='password' />
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' type='primary'>Sign In</Button>
			</Form.Item>
		</Form>

}
