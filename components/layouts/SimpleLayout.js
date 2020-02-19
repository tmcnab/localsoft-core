import {Component} from 'react'
import {Layout, PageHeader} from 'antd'
import {node, string} from 'prop-types'

export default class BareLayout extends Component {

	static propTypes = {
		children: node.isRequired,
		title: string.isRequired,
	}

	render = () =>
		<Layout>
			{/*
			<Layout.Header style={{backgroundColor: 'auto'}}>
				<PageHeader {...this.props} />
			</Layout.Header>
			*/}
			<Layout.Content>
				{this.props.children}
			</Layout.Content>
		</Layout>
}
