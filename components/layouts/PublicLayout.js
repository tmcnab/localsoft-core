import {Component} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {node, string} from 'prop-types'

export default class PublicLayout extends Component {

	static propTypes = {
		children: node.isRequired,
		title: string.isRequired,
	}

	render = () =>
		<>
			<Head>
				<meta content='width=device-width, initial-scale=1' name='viewport' />
				<title>{this.props.title}</title>
			</Head>
			<header>
				<Link href='/people'>
					<a>People</a>
				</Link>
			</header>
			{this.props.children}
		</>
}
