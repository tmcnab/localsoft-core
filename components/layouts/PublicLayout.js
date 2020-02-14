import {} from 'prop-types'
import {Component} from 'react'

export default class PublicLayout extends Component {

	render = () =>
		<>
			{this.props.children}
		</>
}
