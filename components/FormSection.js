import {Component} from 'react'
import {node, string} from 'prop-types'

export default class FormSection extends Component {

	static propTypes = {
		children: node.isRequired,
		title: string.isRequired,
	}

	render = () =>
		<section>
			<h3>{this.props.title}</h3>
			<hr />
			{this.props.children}
		</section>

}
