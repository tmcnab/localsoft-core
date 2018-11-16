import {Button, Col, Drawer, Form, Input, Row, Select} from 'antd'
import {bool} from 'prop-types'
import React, {Component} from 'react'


// TODO https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
export default class IndividualEditView extends Component {

    static propTypes = {
        visible: bool.isRequired,
    }

    componentDidMount = () =>
        null

    onSubmit = (event) => {
        event.preventDefault()
        // TODO
    }

    render = () =>
        <Drawer closable={false} destroyOnClose title='Editing Person' visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit}>
                <Form.Item label='Name'>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Input name='givenName' placeholder='Given' />
                        </Col>
                        <Col span={8}>
                            <Input name='additionalName' placeholder='Additional' />
                        </Col>
                        <Col span={8}>
                            <Input name='familyName' placeholder='Family' />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Contacts'>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input name='email' placeholder='Email' type='email' />
                        </Col>
                        <Col span={12}>
                            <Input name='telephone' placeholder='Phone' type='tel' />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Address'>
                    <Input className='mb1' placeholder='Address Line 1' />
                    <Input className='mb1' placeholder='Address Line 2' />
                    <Row className='mb1' gutter={8}>
                        <Col span={12}>
                            <Input placeholder='City' />
                        </Col>
                        <Col span={12}>
                            <Input placeholder='State' />
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={12}>
                            <Input placeholder='ZIP/Postal Code' />
                        </Col>
                        <Col span={12}>
                            <Input placeholder='Country' />
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item label='Tags'>
                    <Select allowClear mode='tags' />
                </Form.Item>

                <Button type='primary' htmlType='submit'>Save</Button>
                <Button>Cancel</Button>
            </Form>
        </Drawer>

}
