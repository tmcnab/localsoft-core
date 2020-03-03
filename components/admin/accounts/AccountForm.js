import {Component} from 'react'
import {Form, Input} from 'antd'
import {func, shape, string} from 'prop-types'

export default class AccountForm extends Component {

	static propTypes = {
		account: shape({
			domain: string.isRequired,
			name: string.isRequired,
		}),
		onChange: func.isRequired,
	}

	onChange = (event) => {
		const {name, value} = event.target
		this.props.onChange({
			...this.props.account,
			[name]: value
		})
	}

	render = () =>
		<Form colon={false} layout='vertical'>
			<Form.Item label='Name'>
				<Input name='name' onChange={this.onChange} placeholder='Acme, Inc.' required type='text' value={this.props.account.name} />
			</Form.Item>
			<Form.Item label='Domain'>
				<Input name='domain' onChange={this.onChange} placeholder='acme.com' required type='text' value={this.props.account.domain} />
			</Form.Item>
		</Form>

}
