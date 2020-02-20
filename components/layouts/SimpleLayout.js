import {Component} from 'react'
import {func, node, string} from 'prop-types'
import Head from 'next/head'
import {Layout, PageHeader} from 'antd'

export default class SimpleLayout extends Component {

	static propTypes = {
		children: node.isRequired,
		onBack: func,
		title: string.isRequired,
	}

	render = () =>
		<>
			<Head>
				<meta content='width=device-width, initial-scale=1' name='viewport' />
				<title>{this.props.title}</title>
				<style>{`
					#__next, #__next > .ant-layout {
						min-height: 100vh;
					}
				`}</style>
			</Head>
			<Layout>
				<Layout.Content>
					<PageHeader onBack={this.props.onBack} title={this.props.title} />
					{this.props.children}
				</Layout.Content>
			</Layout>
		</>

}
