import {Button, Checkbox, Form, Icon, Input} from 'antd'
import Link from 'next/link'
import {Component} from 'react'

export default class RegisterForm extends Component {

	#onSubmit = (event) => {
		event.preventDefault()
	}

	render = () =>
		<Form onSubmit={this.#onSubmit}>
			<Form.Item>
				<Input placeholder='Email' name='email' prefix={<Icon type='user' />} required type='email' />
			</Form.Item>
			<Form.Item>
				<Input placeholder='Password' name='password' prefix={<Icon type='lock' />} required type='password' />
			</Form.Item>
			<Form.Item>
				<Checkbox name='agreeToTerms'>
					I agree to all <Link href='/information/terms-and-conditions'>Terms &amp; Conditions</Link>
				</Checkbox>
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' type='primary'>Sign In</Button>
			</Form.Item>
		</Form>

}
