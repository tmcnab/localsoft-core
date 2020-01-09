import {} from 'prop-types'
import {Component} from 'react'
import Page from 'layout/Page'
import Container from 'react-bootstrap/Container'

export default class IndexPage extends Component {

	render = () =>
		<Page title='Welcome' footer>
			<Container fluid>
				<p>
					Home Page
				</p>
			</Container>
		</Page>

}
