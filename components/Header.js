import {} from 'prop-types'
import {Component} from 'react'
import Link from 'next/link'
import {Nav, Navbar} from 'react-bootstrap'

export default class LayoutHeader extends Component {

	static displayName = 'Layout.Header'

	render = () =>
		<header>
			<Navbar bg='dark' sticky='top' variant='dark'>
				<Navbar.Brand>localsoft</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav>
						<Nav.Item>
							<Link href='/' passHref>
								<Nav.Link>Home</Nav.Link>
							</Link>
						</Nav.Item>
					</Nav>
					<Nav className='ml-auto'>
						{this.props.can.read.people? (
							<Nav.Item>
								<Link href='/people' passHref>
									<Nav.Link>People</Nav.Link>
								</Link>
							</Nav.Item>
						) : null}
						{this.props.can.read.settings? (
							<Nav.Item>
								<Link href='/settings' passHref>
									<Nav.Link>Settings</Nav.Link>
								</Link>
							</Nav.Item>
						) : null}
						{this.props.can.read.authenticate? (
							<Nav.Item>
								<Link href='/sign-in' passHref>
									<Nav.Link>Sign In</Nav.Link>
								</Link>
							</Nav.Item>
						) : null}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>

}
