import {Button, Form, Icon, Input} from 'antd'
import {Component} from 'react'

export default class RecoverForm extends Component {

	#onSubmit = (event) => {
		event.preventDefault()
	}

	render = () =>
		<Form onSubmit={this.#onSubmit}>
			<p>If you&apos;ve forgotten your password please enter your email address and we&apos;ll send a recovery email.</p>
			<Form.Item>
				<Input name='email' placeholder='Email' prefix={<Icon type='user' />} required type='email' />
			</Form.Item>
			<Form.Item>
				<Button htmlType='submit' type='primary'>Recover</Button>
			</Form.Item>
		</Form>

}
