import {Button, Card, Col, Form, Input, message, Row} from 'antd'
import gql from 'gql'
import React, {Component} from 'react'


export default class AuthenticationPage extends Component {

    state = {
        email: '',
        loading: false,
        password: '',
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    onSubmit = async (event) => {
        event.preventDefault()

        const {authenticate} = await gql(`
            mutation {
                authenticate(email:"${this.state.email}", password:"${this.state.password}")
            }
        `)

        if (authenticate) {
            window.location.assign('/dashboard/')
        } else {
            message.error('There was an error with your email or password')
        }
    }

    render = () =>
        <Row className='full-height' style={{backgroundColor: '#e8e8e8', paddingTop: '25vh'}}>
            <Col offset={9} span={6}>
                <Card loading={this.state.loading} title='localsoft'>
                    <Form hideRequiredMark onSubmit={this.onSubmit}>
                        <Form.Item colon={false} label='Email'>
                            <Input name='email' onChange={this.onChange} required type='email' />
                        </Form.Item>
                        <Form.Item colon={false} label='Password'>
                            <Input name='password' onChange={this.onChange} required type='password' />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button block htmlType='submit' type='primary'>Enter</Button>
                            </Col>
                            <Col span={12}>
                                <Button block disabled onClick={this.onForgotClick}>I Forgot</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>

}
