import {Button, Col, Form, Icon, Input, Layout, Menu, message, Row} from 'antd'
import {Link} from 'react-router-dom'
import {role, string} from 'propTypes'
import {Roles} from 'enums'
import gql from 'gql'
import React, { Component } from 'react';


// NOTE: in the future these permissions will be more granular.
// NOTE: some of these features will be reenabled in V2
const { ANONYMOUS, STAFF, ADMINISTRATOR } = Roles
const MENU_ITEMS = [
    // { key: 'conversations', icon: 'message',      label: 'Conversations', viewers: [MEMBER, STAFF], },
    // { key: 'forums',        icon: 'solution',     label: 'Forums',        viewers: [MEMBER, STAFF], },
    // { key: 'events',        icon: 'calendar',     label: 'Events',        viewers: [MEMBER, STAFF], },
    { key: 'people',        icon: 'team',         label: 'People',        viewers: [STAFF],         },
    { key: 'pages',         icon: 'book',         label: 'Pages',         viewers: [STAFF],         },
    // { key: 'updates',       icon: 'notification', label: 'Updates',       viewers: [STAFF],         },
    // { key: 'email',         icon: 'mail',         label: 'Email',         viewers: [STAFF],         },
    { key: 'files',         icon: 'cloud',        label: 'Files',         viewers: [STAFF],         },
    // { key: 'settings',      icon: 'setting',      label: 'Settings',      viewers: [],              },
]


export default class Sidebar extends Component {

    static propTypes = {
        role: role.isRequired,
    }

    state = {
        email: null,
        password: null,
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    onClickExit = async () => {
        const {deauthenticate} = await gql(`mutation { deauthenticate }`)
        if (deauthenticate) {
            window.application.setState({
                role: Roles.ANONYMOUS,
            }, () => {
                window.location.assign('/')
            })
        }
    }

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
            role: authenticate.role,
        })
    }

    render = () =>
        <Layout.Sider style={{minHeight: '100vh'}} theme='light' width={256}>
            <header className='font-large p1'>
                <Row>
                    <Col span={3}>
                        <Icon type='ant-design' />
                    </Col>
                    <Col span={21}>
                        localsoft
                    </Col>
                </Row>
            </header>
            <Menu mode='vertical' style={{borderRight: 'none'}}>
            {MENU_ITEMS.map(item => {
                const {role} = this.props
                const canView = role === ADMINISTRATOR || item.viewers.includes(role)
                return canView ? (
                    <Menu.Item key={item.key}>
                        <Link to={`/${item.key}/`}>
                            <Icon type={item.icon} /> {item.label}
                        </Link>
                    </Menu.Item>
                ) : null
            })}
            {this.props.role === ANONYMOUS ? null : (
                <Menu.Item key='exit' onClick={this.onClickExit}>
                    <Icon type='logout' /> Leave
                </Menu.Item>
            )}
            </Menu>
            {this.props.role === ANONYMOUS ? (
                <Form className='p1' hideRequiredMark onSubmit={this.onSubmit}>
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
                            <Button block onClick={this.onForgotClick}>I Forgot</Button>
                        </Col>
                    </Row>
                </Form>
            ) : null}
        </Layout.Sider>

}
