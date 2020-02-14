import {node} from 'prop-types'
import {Component} from 'react'
import {Layout, PageHeader} from 'antd'

export default class BareLayout extends Component {

	static propTypes = {
		children: node.isRequired,
	}

	render = () =>
		<Layout>
			<Layout.Header>
				Header
			</Layout.Header>
			<Layout.Content>
				{this.props.children}
			</Layout.Content>
		</Layout>
}
