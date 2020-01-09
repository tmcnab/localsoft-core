import {} from 'prop-types'
import {Button, Card, Col, Container, Form, Row} from 'react-bootstrap'
import {Component} from 'react'
import Page from 'layout/Page'

export default class SignInPage extends Component {

	state = {
		validated: false,
	}

	onSubmit = async (event) => {
		const form = event.currentTarget
		if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		}

		this.setState({validated: true})
	}

	render = () =>
		<Page title='Sign In'>
			<Container style={{paddingTop: '25vh'}}>
				<Row>
					<Col sm={{span:4, offset:4}}>
						<Card>
							<Card.Body>
								<Form noValidate onSubmit={this.onSubmit} validated={this.state.validated}>
									<Form.Group>
										<Form.Label>Email Address</Form.Label>
										<Form.Control name='email' placeholder='Email Address' required type='email' />
										<Form.Control.Feedback type='invalid'>
											Please provide a valid email.
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group>
										<Form.Label>Password</Form.Label>
										<Form.Control name='password' placeholder='Password' required type='password' />
										<Form.Control.Feedback type='invalid'>
											Please provide a password.
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Row>
										<Col>
											Register?
										</Col>
										<Col>
											Recover?
										</Col>
									</Form.Row>
									<Button block type='submit' variant='primary'>
										Sign In
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</Page>

}
