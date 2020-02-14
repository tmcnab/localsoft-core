import {Component} from 'react'
import contextualize from 'contextualize'
import ReactMarkdown from 'react-markdown'

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

	static title = 'Welcome'

	render () {
		return <ReactMarkdown source={this.props.page.content} />
	}


}
