import {bool, func, string} from 'propTypes'
import {Button, Checkbox, Col, DatePicker, Drawer, Form, Input, Row, Select, Tooltip} from 'antd'
import {cloneDeep, get, set} from 'lodash'
import moment from 'moment'
import React, {Component} from 'react'


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
        record: null,
    }

    componentDidMount = async () => {
        const record = this.props.identifier ? {/* TODO GQL */} : {
            content: '',
            identifier: null,
            path: '/new-page-title',
            post: false,
            published: new Date(),
            tags: [],
            title: 'New Page Title'
        }
        this.setState({record})
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        if (this.state.autopath) {
            const titleChanged = get(prevState, 'record.title', '') !== get(this.state, 'record.title', '')
            const postChanged = get(prevState, 'record.post') !== get(this.state, 'record.post')
            if (titleChanged || postChanged) {
                this.updatePath()
            }
        }
    }

    onClickSave = () => {

    }

    tags = () =>
        get(this, 'state.record.tags', [])

    title = () =>
        <Row>
            <Col span={8}>
                <h3 className='mb0'>{this.props.identifier ? 'Editing' : 'Creating'} Page</h3>
            </Col>
            <Col className='align-r' span={16}>
                <Tooltip placement='left' title='Save'>
                    <Button className='mr1' icon='check' onClick={this.onClickSave} shape='circle' type='primary' />
                </Tooltip>
                <Tooltip placement='bottom' title='Abandon'>
                    <Button icon='cross' onClick={this.props.onClose} shape='circle' type='danger' />
                </Tooltip>
            </Col>
        </Row>

    update = (path, value) =>
        this.setState({
            record: set(cloneDeep(this.state.record), path, value)
        })

    updatePath = () => {
        const {post, published, title} = this.state.record
        const date = published.toISOString().split('T')[0]
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
                                checked={get(this, 'state.record.post', false)}
                                onChange={({target}) => this.update('post', target.checked)}
                            />
                        </Tooltip>}
                        name='path'
                        onChange={({target}) => this.update('title', target.value)}
                        placeholder={this.placeholders['title']}
                        required
                        size='large'
                        type='text'
                        value={get(this, 'state.record.title')}
                    />
                </Form.Item>
                <Form.Item label='Content'>
                    <Input.TextArea
                        onChange={({target}) => this.update('content', target.value)}
                        style={{height: '55vh'}}
                        value={get(this, 'state.record.content')}
                    />
                </Form.Item>
                <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item label='Tags'>
                            <Select mode='tags' onChange={value => this.update('tags', value)} value={this.tags()}>
                                {this.tags().map(tag => <Select.Option key={tag}>{tag}</Select.Option>)}
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
                                value={get(this, 'state.record.path')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item label='Publish Date'>
                            <DatePicker
                                format="YYYY-MM-DD HH:mm"
                                name='published'
                                onChange={m => this.update('published', m ? m.toISOString() : m)}
                                showTime
                                value={moment(get(this, 'state.record.published'))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>

}
