import {} from 'prop-types'
import {Component} from 'react'

export default class Dashboard extends Component {

	render = () =>
		<>
			{this.props.children}
		</>
}
