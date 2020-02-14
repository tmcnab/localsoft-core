import {Col, Row, Tabs} from 'antd'
import {Component} from 'react'
import contextualize from 'contextualize'

export default class IndexPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const {page} = await ctx.gql(`{
			page: findPage(path: "/") {
				content
				contentType
			}
		}`)

		if (!page) {
			ctx.redirect('/sign-in')
		}

		return { page }
	}

	static title = 'Sign In'

	render = () =>
		<Row>
			<Col offset={8} span={8}>
				Form
			</Col>
		</Row>

}
