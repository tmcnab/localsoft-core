import {Button, Card, Col, Form, Input, message, Row} from 'antd'
import {HelpButton, Page} from 'components'
import AuthenticateHelpDrawer from 'drawers/AuthenticateHelpDrawer'
import gql from 'gql'
import React from 'react'


export default class AuthenticationPage extends Page {

    state = {
        email: null,
        helpVisible: false,
        password: null,
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    onClickHelp = () =>
        this.setState({helpVisible: true})

    onCloseHelp = () =>
        this.setState({helpVisible: false})

    onSubmit = async (event) => {
        event.preventDefault()
        const {authenticate} = await gql(`
            mutation {
                authenticate(email:"${this.state.email}", password:"${this.state.password}") {
                    role
                }
            }
        `)

        // If there is no auth data passed back the email or password was bad.
        if (!authenticate) {
            return message.error('There was an error with your email or password')
        }

        window.application.setState({
            viewerRole: authenticate.role,
        }, () => {
            this.props.history.push('/dashboard/')
        })
    }

    render = () =>
        <>
            <Page.Header title='Enter'>
                <HelpButton onClick={this.onClickHelp} />
            </Page.Header>
            <Row>
                <Col span={8} />
                <Col span={8}>
                    <Card>
                        <Form onSubmit={this.onSubmit}>
                            <Form.Item label='Email'>
                                <Input name='email' onChange={this.onChange} required type='email' />
                            </Form.Item>
                            <Form.Item label='Password'>
                                <Input name='password' onChange={this.onChange} required type='password' />
                            </Form.Item>
                            <Row>
                                <Col span={11}>
                                    <Button block htmlType='submit' type='primary'>Enter</Button>
                                </Col>
                                <Col span={2} />
                                <Col span={11}>
                                    <Button block onClick={this.onForgotClick}>I Forgot</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col span={8} />
            </Row>
            <AuthenticateHelpDrawer onClose={this.onCloseHelp} visible={this.state.helpVisible} />
        </>

}
