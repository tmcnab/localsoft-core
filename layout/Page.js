import Header from './Header'
import Head from 'next/head'
import {bool, node, string} from 'prop-types'
import {Component} from 'react'

export default class Page extends Component {

	static defaultProps = {
		header: Header.Type.Simple,
		footer: false,
	}

	static propTypes = {
		children: node.isRequired,
		header: Header.Type.validator.isRequired,
		footer: bool.isRequired,
		title: string,
	}

	render = () =>
		<>
			<Head>
				<title>{this.props.title}</title>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<div>
				<Header type={this.props.header} />
				<main>
					{this.props.children}
				</main>
			</div>
		</>
}
