import {bool, func} from 'propTypes'
import {Button, Drawer, Form, Icon, Input, message, Tooltip} from 'antd'
import {cloneDeep, get, set} from 'lodash'
import {DrawerTitle} from 'components'
import gql from 'gql'
import React, {Component} from 'react'
import {Roles} from 'enums'

// TODO: instead of triggering save with Input::onBlur, set a throttled timeout when user stops typing. [@tmcnab]
export default class PageInfoDrawer extends Component {

    static propTypes = {
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    placeholders = {
        site_description: 'This will appear in html metadata',
        site_title: 'Website Title (Required)',
        twitter_username: '@username'
    }

    state = {
        input: {
            'description': '',
            'title': '',
            'twitter': ''
        },
        loading: false,
        role: Roles.STAFF,
    }

    title = () =>
        <DrawerTitle title='Info: Pages'>
            <Tooltip placement='left' title='Close'>
                <Button icon='right' loading={this.state.loading} onClick={() => this.props.onClose(false)} shape='circle' />
            </Tooltip>
        </DrawerTitle>

    types = {
        site_url: 'url'
    }

    componentDidUpdate = (prevProps) => {
        const {visible} = this.props
        if (visible && visible !== prevProps.visible) {
            this.retrieve()
        }
    }

    inputFor = (path) => {
        const onChange = event => this.update(path, event.target.value)
        const placeholder = this.placeholders[path]
        const type = this.types[path] || 'text'
        const value = get(this.state.input, path, '')
        return <Input name={path} onBlur={this.save} onChange={onChange} placeholder={placeholder} type={type} value={value} />
    }

    retrieve = async () => {
        this.setState({ loading: true })
        const {currentUser, input} = await gql(`
            query {
                input: account {
                    site_description
                    site_title
                    twitter_username
                }
                currentUser {
                    role
                }
            }
        `)

        this.setState({
            input,
            loading: false,
            role: currentUser.role,
        })
    }

    save = async () => {
        this.setState({loading: true})

        const {saveAccount} = await gql(`
            mutation ($input: AccountInput!) {
                saveAccount(input: $input)
            }
        `, {input: this.state.input})

        this.setState({loading: false}, () => {
            if (!saveAccount) {
                message.error('There was an error saving.')
            }
        })
    }

    update = (path, value) => {
        const input = set(cloneDeep(this.state.input), path, value)
        this.setState({input})
    }

    render = () =>
        <Drawer closable={false} onClose={this.props.onClose} placement='right' title={this.title()} visible={this.props.visible} width={512}>
            <p>
                This section allows you to create static pages and blog posts. Behind the scenes we use
                &nbsp;<a href='https://jekyllrb.com/'>Jekyll <Icon type='link' /></a> to render&nbsp;
                <a href="https://kramdown.gettalong.org/quickref.html">Kramdown/Markdown <Icon type='link' /></a>.
            </p>
        {this.state.role === Roles.ADMINISTRATOR ? (
            <>
                <h3>Site Settings</h3>
                <Form layout='vertical'>
                    <Form.Item className='mt1' label='Website Title'>
                        {this.inputFor('site_title')}
                    </Form.Item>
                    <Form.Item label='Description'>
                        {this.inputFor('site_description')}
                    </Form.Item>
                    <Form.Item label='Twitter Handle'>
                        {this.inputFor('twitter_username')}
                    </Form.Item>
                </Form>
            </>
        ) : null}
        </Drawer>

}
