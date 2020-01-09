import {Component} from 'react'
import Link from 'next/link'
import {Nav, Navbar} from 'react-bootstrap'

export default class SimpleHeader extends Component {

	static displayName = 'Header.Simple'

	render = () =>
		<header>
			<Navbar bg='dark' sticky='top' variant='dark'>
				<Navbar.Brand>
					localsoft
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav>
						<Nav.Item>
							<Link href='/' passHref>
								<Nav.Link>Home</Nav.Link>
							</Link>
						</Nav.Item>
						<Nav.Item>
							<Link href='/sign-in' passHref>
								<Nav.Link>
									Sign In
								</Nav.Link>
							</Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>

}
