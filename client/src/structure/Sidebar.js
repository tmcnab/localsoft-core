import {Link} from 'react-router-dom'
import {Icon, Layout, Menu} from 'antd'
import React, { Component } from 'react';


export default class Sidebar extends Component {

    render = () =>
        <Layout.Sider style={{minHeight: '100vh'}}>
            <div className='brand'>
                instance name
            </div>
            <Menu mode="vertical" theme="dark" >
                <Menu.Item key='dashboard'>
                    <Link to='/'>
                        <Icon type='appstore' /> Dashboard
                    </Link>
                </Menu.Item>
                <Menu.Item key='updates'>
                    <Link to='/updates/'>
                        <Icon type='notification' /> Updates
                    </Link>
                </Menu.Item>
                <Menu.Item key='forums'>
                    <Link to='/forums/'>
                        <Icon type='solution' /> Forums
                    </Link>
                </Menu.Item>
                <Menu.Item key='conversations'>
                    <Link to='/conversations/'>
                        <Icon type='message' /> Conversations
                    </Link>
                </Menu.Item>
                <Menu.Item key='people'>
                    <Link to='/people/'>
                        <Icon type='team' /> People
                    </Link>
                </Menu.Item>
                <Menu.Item key='pages'>
                    <Link to='/pages/'>
                        <Icon type='book' /> Pages
                    </Link>
                </Menu.Item>
                <Menu.Item key='email'>
                    <Link to='/email/'>
                        <Icon type='mail' /> Email
                    </Link>
                </Menu.Item>
                <Menu.Item key='events'>
                    <Link to='/events/'>
                        <Icon type='calendar' /> Events
                    </Link>
                </Menu.Item>
                <Menu.Item key='files'>
                    <Link to='/files/'>
                        <Icon type='cloud' /> Files
                    </Link>
                </Menu.Item>
                <Menu.Item key='settings'>
                    <Link to='/settings/'>
                        <Icon type='setting' /> Settings
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Sider>

}
