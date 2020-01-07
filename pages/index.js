import Page from 'layout/Page'
import {} from 'prop-types'
import React, {Component} from 'react'

export default class IndexPage extends Component {

	render = () =>
		<Page title='Welcome' footer>
			<ul>
				Home Page
			</ul>
		</Page>

}
