import {Layout} from 'antd'
import {createEnum} from '../enums'
import Header from './Header'
import Link from 'next/link'
import Head from 'next/head'
import {bool, string} from 'prop-types'
import {Component} from 'react'
import './Page.css'

export default class Page extends Component {

	static defaultProps = {
		header: Header.Type.Simple,
		footer: false,
		sidebar: false,
	}

	static propTypes = {
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
					{this.props.sidebar ? <Layout.Sider>Sider</Layout.Sider> : null}
					<Layout.Content>{this.props.children}</Layout.Content>
				</Layout>
				{this.props.footer ? <Layout.Footer>Footer</Layout.Footer> : null}
			</Layout>
		</>
}
