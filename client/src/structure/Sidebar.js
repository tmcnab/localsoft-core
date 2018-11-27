import {Col, Icon, Layout, Menu, Row} from 'antd'
import {Link} from 'react-router-dom'
import {role, string} from 'propTypes'
import {Roles} from 'enums'
import gql from 'gql'
import React, { Component } from 'react';


// NOTE: in the future these permissions will be more granular.
// NOTE: some of these features will be reenabled in V2
const { ANONYMOUS, MEMBER, STAFF, ADMINISTRATOR } = Roles
const MENU_ITEMS = [
    { key: 'dashboard',     icon: 'appstore',     label: 'Dashboard',     viewers: [MEMBER, STAFF], },
    // { key: 'conversations', icon: 'message',      label: 'Conversations', viewers: [MEMBER, STAFF], },
    // { key: 'forums',        icon: 'solution',     label: 'Forums',        viewers: [MEMBER, STAFF], },
    { key: 'events',        icon: 'calendar',     label: 'Events',        viewers: [MEMBER, STAFF], },
    { key: 'people',        icon: 'team',         label: 'People',        viewers: [STAFF],         },
    // { key: 'pages',         icon: 'book',         label: 'Pages',         viewers: [STAFF],         },
    // { key: 'updates',       icon: 'notification', label: 'Updates',       viewers: [STAFF],         },
    { key: 'email',         icon: 'mail',         label: 'Email',         viewers: [STAFF],         },
    { key: 'files',         icon: 'cloud',        label: 'Files',         viewers: [STAFF],         },
    // { key: 'settings',      icon: 'setting',      label: 'Settings',      viewers: [],              },
]


export default class Sidebar extends Component {

    static propTypes = {
        instanceName: string.isRequired,
        viewerRole: role.isRequired,
    }

    onClickExit = async () => {
        const {deauthenticate} = await gql(`mutation { deauthenticate }`)
        if (deauthenticate) {
            window.application.setState({
                viewerRole: Roles.ANONYMOUS,
            }, () => {
                window.location.assign('/')
            })
        }
    }

    render = () =>
        <Layout.Sider style={{minHeight: '100vh'}}>
            <header className='font-large p1 text-white'>
                <Row>
                    <Col span={4}>
                        <Icon type='ant-design' />
                    </Col>
                    <Col span={20}>
                        {this.props.instanceName}
                    </Col>
                </Row>
            </header>
            <Menu mode='vertical' theme='dark' >
            {MENU_ITEMS.map(item => {
                const {viewerRole} = this.props
                const canView = viewerRole === ADMINISTRATOR || item.viewers.includes(viewerRole)
                return canView ? (
                    <Menu.Item key={item.key}>
                        <Link to={`/${item.key}/`}>
                            <Icon type={item.icon} /> {item.label}
                        </Link>
                    </Menu.Item>
                ) : null
            })}
            {this.props.viewerRole === ANONYMOUS ? (
                <Menu.Item key='enter'>
                    <Link to='/enter/'>
                        <Icon type='login' /> Enter
                    </Link>
                </Menu.Item>
            ) : (
                <Menu.Item key='exit' onClick={this.onClickExit}>
                    <Icon type='logout' /> Leave
                </Menu.Item>
            )}
            </Menu>
        </Layout.Sider>

}
