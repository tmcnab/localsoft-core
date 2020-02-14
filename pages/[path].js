import {Component} from 'react'
import contextualize from 'contextualize'
import Error from 'next/error'
import ReactMarkdown from 'react-markdown'
import {shape, string} from 'prop-types'

export default class DynamicPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const {page} = await ctx.gql(`{
			page: findPage(path: "/") {
				content
				contentType
			}
		}`)

		return { page }
	}

	static propTypes = {
		page: shape({
			content: string
		})
	}

	render () {
		const {page} = this.props
		return page
			?	<ReactMarkdown source={this.props.page.content} />
			: <Error statusCode={404} />
	}


}
