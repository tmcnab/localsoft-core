import {Component} from 'react'
import contextualize from 'contextualize'
import ReactMarkdown from 'react-markdown'
import {shape, string} from 'prop-types'

export default class IndexPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const {page} = await ctx.gql(`{
			page: findPage(path: "/") {
				content
				contentType
				path
			}
		}`)

		if (!page) {
			ctx.redirect('/sign-in')
		}

		return { page }
	}

	static propTypes = {
		page: shape({
			content: string
		})
	}

	static title = 'Welcome'

	render () {
		return <ReactMarkdown source={this.props.page.content} />
	}

}
