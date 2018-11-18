import {BrowserRouter} from 'react-router-dom'
import {Layout} from 'antd'
import React, { Component } from 'react';
import Routes from 'structure/Routes'
import Sidebar from 'structure/Sidebar'


export default class Application extends Component {

    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar />
                <Layout>
                    <Layout.Content style={{padding: '1rem'}}>
                        <Routes />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
