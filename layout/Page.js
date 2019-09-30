import {Layout} from 'antd'
import Header from './Header'
import Head from 'next/head'
import {bool, node, string} from 'prop-types'
import {Component} from 'react'
import Sidebar from './Sidebar'
import './Page.css'
import './overrides.css'

export default class Page extends Component {

	static defaultProps = {
		header: Header.Type.Simple,
		footer: false,
		sidebar: false,
	}

	static propTypes = {
		children: node.isRequired,
		header: Header.Type.validator.isRequired,
		footer: bool.isRequired,
		sidebar: bool.isRequired,
		title: string,
	}

	render = () =>
		<>
			<Head>
				<title>{this.props.title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Layout>
				<Header type={this.props.header} />
				<Layout>
					{this.props.sidebar ? <Sidebar /> : null}
					<Layout.Content>{this.props.children}</Layout.Content>
				</Layout>
				{this.props.footer ? <Layout.Footer>Footer</Layout.Footer> : null}
			</Layout>
		</>
}
