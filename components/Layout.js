import {} from 'prop-types'
import {Component} from 'react'
import Header from './Header'
import Head from 'next/head'

export default class Layout extends Component {

	render = () =>
		<>
			<Head>
				<title>Title</title>
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
			<Header {...this.props} />
			<main>
				{this.props.children}
			</main>
		</>
}
