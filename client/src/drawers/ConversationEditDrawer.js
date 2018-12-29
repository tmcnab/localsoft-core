import {bool, func, string} from 'propTypes'
import {Button, Drawer, Form, Input, Select, Tooltip} from 'antd'
import {DrawerTitle} from 'components'
import {cloneDeep, set} from 'lodash'
import React, {Component} from 'react'
import {Roles} from '../enums'


const BLANK_INPUT = Object.seal({
    access: [Roles.MEMBER, Roles.STAFF],
    description: '',
    identifier: '',
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
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.identifier !== prevProps.identifier) {
            if (this.props.identifier) {
                this.query()
            }
        }
    }

    query = async () => {
        // TODO:
    }

    save = async () => {
        // TODO:
    }

    title = () =>
        <DrawerTitle title={`${this.props.identifier ? 'Editing' : 'Creating'} Conversation`}>
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
                        placeholder='Conversation Title / Subject'
                        size='large'
                        type='text'
                        value={this.state.input.title}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        name='description'
                        onChange={event => this.update('description', event.target.value)}
                        placeholder='Conversation Description'
                        size='large'
                        type='text'
                        value={this.state.input.description}
                    />
                </Form.Item>
                <Form.Item label='Tags'>
                    <Select mode='tags' onChange={value => this.update('access', value)} value={this.state.input.access}>
                        {Object.keys(Roles).map(role => <Select.Option key={role}>{role}</Select.Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Drawer>

}
