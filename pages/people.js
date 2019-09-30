import {Button, PageHeader} from 'antd'
import Page from 'layout/Page'
import {arrayOf, shape, string} from 'prop-types'
import {Component} from 'react'

export default class PeoplePage extends Component {

	static propTypes = {
		people: arrayOf(shape({
			additionalName: string,
			email: string,
			familyName: string,
			givenName: string,
		}))
	}

	state = {
		people: this.props.people,
	}

	#extra = [
		<Button icon='plus' key='add' shape='circle' />,
		<Button icon='upload' key='import' shape='circle' />,
		<Button icon='question' key='help' shape='circle' />,
	]

	render = () =>
		<Page header='NONE' sidebar title='People'>
			<PageHeader title='People' extra={this.#extra} />

		</Page>

}
