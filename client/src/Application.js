import {BrowserRouter, Link, Route} from 'react-router-dom'
import {Icon, Layout, Menu} from 'antd'
import DashboardPage from 'pages/DashboardPage'
import PeopleListPage from 'pages/PeopleListPage/PeopleListPage'
import React, { Component } from 'react';

export default class App extends Component {

    state = {
        collapsed: false,
    }

    onCollapse = (collapsed) =>
        this.setState({ collapsed })

    render = () =>
        <BrowserRouter>
            <Layout>
                <Layout.Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{minHeight: '100vh'}}>
                    <div className='brand'>
                        instance name
                    </div>
                    <Menu defaultSelectedKeys={['dashboard']} mode="vertical" theme="dark" >
                        <Menu.Item key='dashboard'>
                            <Link to='/!/'>
                                <Icon type='home' /> Dashboard
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='people'>
                            <Link to='/!/people/'>
                                <Icon type='team' /> People
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Layout.Sider>
                <Layout>
                    <Layout.Content style={{padding: '1rem'}}>
                        <Route component={DashboardPage} exact path='/!/' />
                        <Route component={PeopleListPage} exact path='/!/people' />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
