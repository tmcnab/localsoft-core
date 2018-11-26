import {Icon, Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'
import {role} from 'propTypes'
import {Roles} from 'enums'
import React, { Component } from 'react';


// NOTE: in the future these permissions will be more granular.
const { ANONYMOUS, MEMBER, STAFF, ADMINISTRATOR } = Roles
const MENU_ITEMS = [
    { key: 'dashboard',     icon: 'appstore',     label: 'Dashboard',     viewers: [MEMBER, STAFF], },
    { key: 'conversations', icon: 'message',      label: 'Conversations', viewers: [MEMBER, STAFF], },
    { key: 'forums',        icon: 'solution',     label: 'Forums',        viewers: [MEMBER, STAFF], },
    { key: 'events',        icon: 'calendar',     label: 'Events',        viewers: [MEMBER, STAFF], },
    { key: 'people',        icon: 'team',         label: 'People',        viewers: [STAFF],         },
    { key: 'pages',         icon: 'book',         label: 'Pages',         viewers: [STAFF],         },
    { key: 'updates',       icon: 'notification', label: 'Updates',       viewers: [STAFF],         },
    { key: 'email',         icon: 'mail',         label: 'Email',         viewers: [STAFF],         },
    { key: 'files',         icon: 'cloud',        label: 'Files',         viewers: [STAFF],         },
    { key: 'settings',      icon: 'setting',      label: 'Settings',      viewers: [],              },
]


export default class Sidebar extends Component {

    static propTypes = {
        viewerRole: role.isRequired,
    }

    render = () =>
        <Layout.Sider style={{minHeight: '100vh'}}>
            <div className='brand'>
                instance name
            </div>
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
                <Menu.Item key='exit'>
                    <Icon type='logout' /> Leave
                </Menu.Item>
            )}
            </Menu>
        </Layout.Sider>

}
