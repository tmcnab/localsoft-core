import {Button, Col, Form, Input, Row, Select} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'


export default class PersonEditPage extends Page {

    state = {
        person: null,
    }

    onAbandonClick = () =>
        this.props.history.push('/people/')

    render = () =>
        <>
            <Page.Header title='Editing Person'>
                <Button className='mr1' icon='check' type='primary'>
                    Save
                </Button>
                <Button className='mr1' icon='stop' onClick={this.onAbandonClick} type='danger'>
                    Abandon
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Row>
                <Col span={12}>
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
                    </Form>
                </Col>
                <Col span={12}>
                    <p>TBA: other information related to this.</p>
                </Col>
            </Row>
        </>

}
