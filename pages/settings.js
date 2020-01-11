import {} from 'prop-types'
import {Container, Nav, Navbar} from 'react-bootstrap'
import React, {Component} from 'react'

export default class SettingsPage extends Component {

	render = () =>
		<>
			<Navbar>
				<Navbar.Brand>Settings</Navbar.Brand>
				<Navbar.Collapse>
					<Nav activeKey='account' justify variant='tabs'>
						<Nav.Item>
							<Nav.Link eventKey='account'>Account</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='privacy'>Privacy</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Container>
				<p>Settings go here</p>
			</Container>
		</>

}
