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
				<link
					crossOrigin='anonymous'
					href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
					integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
					rel='stylesheet'
				/>
				<style>{`
						html, body, #__next {
							height: 100%;
						}
				`}</style>
			</Head>
			<Header type={this.props.header} />
			<main>
				{this.props.children}
			</main>
		</>
}
