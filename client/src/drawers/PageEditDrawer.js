import {bool, func, string} from 'propTypes'
import {Button, Checkbox, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Tooltip} from 'antd'
import {cloneDeep, get, set} from 'lodash'
import gql from 'gql'
import moment from 'moment'
import React, {Component} from 'react'


const EMPTY_INPUT = {
    content: '',
    identifier: null,
    path: '/new-page-title',
    post: false,
    published: new Date().toISOString(),
    tags: [],
    title: 'New Page Title'
}


export default class PageEditDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    placeholders = {
        title: 'Page or Post Title',
    }

    state = {
        autopath: true,
        input: EMPTY_INPUT,
        saving: false,
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.state.autopath) {
            const titleChanged = get(prevState, 'input.title', '') !== get(this.state, 'input.title', '')
            const postChanged = get(prevState, 'input.post') !== get(this.state, 'input.post')
            if (titleChanged || postChanged) {
                this.updatePath()
            }
        }

        if (this.props.identifier !== prevProps.identifier) {
            if (this.props.identifier) {
                this.retrieve()
            }
        }
    }

    onClickSave = async () => {
        this.setState({saving: true}, async () => await this.save())
    }

    retrieve = async () => {
        const {page} = await gql(`
            query {
                page(identifier:"ebc2124a-b81a-49b5-bbac-f03daffae288") {
                	content
                    identifier
                	path
                	post
                	published
                	tags
                	title
                }
            }
        `)
        this.setState({input: page})
    }

    save = async () => {
        const result = await gql(`
            mutation ($input: PageInput!) {
                savePage(input: $input)
            }
        `, {input: this.state.input})

        this.setState({saving: false}, () => {
            if (result.savePage) {
                this.props.onClose(true)
            } else {
                message.error('There was an error saving.')
            }
        })
    }

    title = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0'>{this.props.identifier ? 'Editing' : 'Creating'} Page</h3>
            </Col>
            <Col className='align-r' span={16}>
                <Tooltip placement='left' title='Save'>
                    <Button
                        className='mr1'
                        icon='check'
                        onClick={this.onClickSave}
                        loading={this.state.saving}
                        shape='circle'
                        type='primary'
                    />
                </Tooltip>
                <Tooltip placement='bottom' title='Abandon'>
                    <Button icon='cross' onClick={this.props.onClose} shape='circle' type='danger' />
                </Tooltip>
            </Col>
        </Row>

    update = (path, value) =>
        this.setState({
            input: set(cloneDeep(this.state.input), path, value)
        })

    updatePath = () => {
        const {post, published, title} = this.state.input
        const date = published.split('T')[0]
        const name = title.replace(/ /g, '-')
        this.update('path', post ? `/posts/${date}/${name}` : `/${name}`)
    }

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} maskClosable={false} placement='right' title={this.title()} visible={this.props.visible} width={1024}>
            <Form layout='vertical' onSubmit={this.onSubmit}>
                <Form.Item>
                    <Input
                        suffix={<Tooltip placement='left' title='Post?'>
                            <Checkbox
                                checked={get(this, 'state.input.post', false)}
                                onChange={({target}) => this.update('post', target.checked)}
                            />
                        </Tooltip>}
                        name='path'
                        onChange={({target}) => this.update('title', target.value)}
                        placeholder={this.placeholders['title']}
                        required
                        size='large'
                        type='text'
                        value={this.state.input.title}
                    />
                </Form.Item>
                <Form.Item label='Content'>
                    <Input.TextArea
                        onChange={({target}) => this.update('content', target.value)}
                        style={{height: '55vh'}}
                        value={this.state.input.content}
                    />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label='Tags'>
                            <Select
                                mode='tags'
                                onChange={value => this.update('tags', value)}
                                value={this.state.input.tags}
                            >
                                {this.state.input.tags.map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item label='Path'>
                            <Input
                                suffix={<Tooltip placement='left' title='Generate Slug?'>
                                    <Checkbox
                                        checked={this.state.autopath}
                                        onChange={event => this.setState({autopath: event.target.checked})}
                                    />
                                </Tooltip>}
                                disabled={this.state.autopath}
                                name='path'
                                placeholder={this.placeholders['path']}
                                type='text'
                                value={get(this, 'state.input.path')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label='Publish Date'>
                            <DatePicker
                                defaultValue={moment()}
                                format="YYYY-MM-DD HH:mm"
                                name='published'
                                onChange={m => this.update('published', (m || moment()).toISOString())}
                                showTime
                                value={moment(get(this, 'state.input.published'))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>

}
