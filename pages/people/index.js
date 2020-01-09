import Page from 'layout/Page'
import {} from 'prop-types'
import React, {Component} from 'react'

export default class PeopleIndexPage extends Component {

	render = () =>
		<Page title='Welcome' footer>
			<ul>
				This is a list/grid view of people.
			</ul>
		</Page>

}
