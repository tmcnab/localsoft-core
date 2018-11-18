import {BrowserRouter, Route} from 'react-router-dom'
import {Layout} from 'antd'
import DashboardPage from 'pages/DashboardPage'
import PeopleListPage from 'pages/PeopleListPage/PeopleListPage'
import React, { Component } from 'react';
import Sidebar from 'structure/Sidebar'


export default class Application extends Component {

    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar />
                <Layout>
                    <Layout.Content style={{padding: '1rem'}}>
                        <Route component={DashboardPage} exact path='/!/' />
                        <Route component={PeopleListPage} exact path='/!/people' />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
