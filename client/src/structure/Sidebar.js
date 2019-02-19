import {Col, Icon, Layout, Menu, Row} from 'antd'
import {Link} from 'react-router-dom'
import {role} from 'propTypes'
import {Roles} from 'enums'
import gql from 'gql'
import React, { Component } from 'react';


// NOTE: in the future these permissions will be more granular.
// NOTE: some of these features will be reenabled in V2
const { ANONYMOUS, STAFF, ADMINISTRATOR } = Roles
const MENU_ITEMS = [
    { key: 'people', icon: 'team',  label: 'People', viewers: [STAFF], },
    { key: 'pages',  icon: 'book',  label: 'Pages',  viewers: [STAFF], },
    { key: 'email',  icon: 'mail',  label: 'Email',  viewers: [STAFF], },
    { key: 'files',  icon: 'cloud', label: 'Files',  viewers: [STAFF], },
]


export default class Sidebar extends Component {

    static propTypes = {
        role: role.isRequired,
    }

    render = () =>
        <Layout.Sider className='border-right' theme='light' width={192}>
            <header className='font-large p1'>
                <Row>
                    <Col span={3}>
                        <Icon type='ant-design' />
                    </Col>
                    <Col span={21}>
                        <strong>localsoft</strong>
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
            </Menu>
        </Layout.Sider>

}
