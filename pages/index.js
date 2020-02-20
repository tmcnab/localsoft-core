import {Component} from 'react'
import contextualize from 'contextualize'
import PublicLayout from 'components/layouts/PublicLayout'
import ReactMarkdown from 'react-markdown'
import {shape, string} from 'prop-types'

export default class IndexPage extends Component {

	static getInitialProps = async (args) => {
		const ctx = contextualize(args)
		const {page} = await ctx.gql(`{
			page (path: "/") {
				content
				contentType
				title
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

	render = () =>
		<PublicLayout title={this.props.page.title}>
			<ReactMarkdown source={this.props.page.content} />
		</PublicLayout>

}
