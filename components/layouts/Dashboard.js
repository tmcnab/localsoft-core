import {} from 'prop-types'
import {Col, Container, Navbar, Row} from 'react-bootstrap'
import {Component} from 'react'

export default class Layout extends Component {

	render = () =>
		<>
			<Navbar bg='dark' sticky='top' variant='dark'>
				<Navbar.Brand>Organization Name</Navbar.Brand>
			</Navbar>
			<Container fluid>
				<Row>
					<Col className='bg-light' md={2}>
            Sidebar
					</Col>
					<Col md={9} lg={10}>
            Stuff
					</Col>
				</Row>
			</Container>
		</>
}
