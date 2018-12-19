import {bool, func, string} from 'propTypes'
import {Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Tooltip} from 'antd'
import {DrawerTitle} from 'components'
import {cloneDeep, set} from 'lodash'
import React, {Component} from 'react'
import gql from 'gql'
import moment from 'moment'


const BLANK_INPUT = Object.seal({
    content: '',
    identifier: '',
    sendAt: new Date().toISOString(),
    tags: [],
    targets: [],
    title: 'My New Email'
})

export default class EmailEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        input: cloneDeep(BLANK_INPUT),
        loading: false,
        tags: [],
    }

    get disabled () {
        return new Date(this.state.input.sendAt) < new Date()
    }

    componentDidMount = async () => {
        if (this.props.identifier) {
            this.query()
        }

        const {tags} = await gql(`query { tags: peopleTags }`)
        this.setState({tags})
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.identifier !== prevProps.identifier) {
            if (this.props.identifier) {
                this.query()
            }
        }
    }

    query = async () => {
        this.setState({loading: true})

        const {input, tags} = await gql(`
            query ($identifier: ID!) {
                input: email(identifier: $identifier) {
                    content
                    identifier
                    sendAt
                    tags
                    targets
                    title
                }
            }
        `, {identifier: this.props.identifier})

        this.setState({
            input,
            loading: false,
            tags,
        })
    }

    save = async () => {
        this.setState({loading: true})

        const result = await gql(`
            mutation ($input: EmailInput!) {
                saveEmail(input: $input)
            }
        `, {input: this.state.input})

        this.setState({loading: false}, () => {
            if (result.saveEmail) {
                this.props.onClose(true)
            } else {
                message.error('There was an error saving.')
            }
        })
    }

    title = () =>
        <DrawerTitle title={`${this.props.identifier ? 'Editing' : 'Creating'} Email`}>
            <Tooltip placement='left' title='Preview'>
                <Button className='mr1' icon='eye' onClick={this.onClickPreview} shape='circle' />
            </Tooltip>
            <Tooltip placement='bottom' title='Save'>
                <Button className='mr1' icon='check' loading={this.state.loading} onClick={this.save} shape='circle' type='primary' />
            </Tooltip>
            <Tooltip placement='bottom' title='Abandon'>
                <Button icon='cross' onClick={this.props.onClose} shape='circle' type='danger' />
            </Tooltip>
        </DrawerTitle>

    update = (path, value) =>
        this.setState({
            input: set(cloneDeep(this.state.input), path, value)
        })

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={768}>
            <Form layout='vertical' onSubmit={this.onSubmit} ref={this.formRef}>
                <Form.Item>
                    <Input
                        name='title'
                        onChange={event => this.update('title', event.target.value)}
                        placeholder='Email Title / Subject'
                        size='large'
                        type='text'
                        value={this.state.input.title}
                    />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={16}>
                        <Form.Item label='Recipients'>
                            <Select
                                mode='tags'
                                onChange={value => this.update('targets', value)}
                                value={this.state.input.targets}
                            >
                                {this.state.input.targets.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label='Scheduled Send'>
                            <DatePicker
                                allowClear={false}
                                className='full'
                                format='YYYY-MM-DD HH:mm:ss'
                                onChange={m => this.update('sendAt', m.toISOString())}
                                onOk={m => this.update('sendAt', m.toISOString())}
                                placeholder='Select Time'
                                showTime
                                value={moment(this.state.input.sendAt)}
                             />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label='Content'>
                    <Input.TextArea
                        onChange={({target}) => this.update('content', target.value)}
                        style={{height: '50vh'}}
                        value={this.state.input.content}
                    />
                </Form.Item>
                <Form.Item label='Tags'>
                    <Select mode='tags' onChange={value => this.update('tags', value)} value={this.state.input.tags}>
                        {this.state.input.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>

}
