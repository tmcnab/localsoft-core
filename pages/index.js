import {Component} from 'react'
import {Container} from 'react-bootstrap'

export default class IndexPage extends Component {

	static title = 'Welcome'

	render = () =>
		<Container fluid>
			<p>
				Home Page
			</p>
		</Container>

}
