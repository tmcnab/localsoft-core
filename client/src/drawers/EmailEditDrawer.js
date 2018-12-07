import {bool, func, string} from 'propTypes'
import {Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Tooltip} from 'antd'
import React, {Component} from 'react'



const BLANK_RECORD = Object.seal({
    recipients: [],
    sendAt: new Date(),
    tags: [],
    title: "",
})



export default class EmailEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        email: BLANK_RECORD,
    }

    retrieve = async () => {
        // TODO:
        //  - email(id),
        //  - tags
    }

    title = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0'>{this.props.identifier ? 'Editing' : 'Creating'} Email</h3>
            </Col>
            <Col className='align-r' span={16}>
                <Tooltip placement='left' title='Preview'>
                    <Button className='mr1' icon='eye' onClick={this.onClickPreview} shape='circle' />
                </Tooltip>
                <Tooltip placement='bottom' title='Save'>
                    <Button className='mr1' icon='check' onClick={this.onClickSave} shape='circle' type='primary' />
                </Tooltip>
                <Tooltip placement='bottom' title='Abandon'>
                    <Button icon='cross' onClick={this.props.onClose} shape='circle' type='danger' />
                </Tooltip>
            </Col>
        </Row>

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit} ref={this.formRef}>
                <Form.Item label='Name'>
                    <Input placeholder='Title' />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={16}>
                        <Form.Item label='Recipients'>
                            <Select mode='tags' onChange={value => this.update('tags', value)} value={this.state.email.recipients}>
                                {this.state.email.recipients.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Scheduled Send'>
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder="Select Time" onChange={null} onOk={null} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Content'>
                    <Input.TextArea placeholder='Email Content' />
                </Form.Item>
                <Form.Item label='Tags'>
                    <Select mode='tags' onChange={value => this.update('tags', value)} value={this.state.email.tags}>
                        {this.state.email.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>

}
