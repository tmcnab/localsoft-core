import {Alert} from 'antd'
import {Component} from 'react'
import {string} from 'prop-types'

export default class ErrorAlert extends Component {

	static propTypes = {
		message: string,
	}

	render = () => {
		const {message} = this.props
		return message ? (
			<>
				<Alert closable message={message} type='error' />
				<br />
			</>
		) : null
	}

}
