import {BrowserRouter} from 'react-router-dom'
import {Layout} from 'antd'
import {Roles} from './enums'
import gql from 'gql'
import React, { Component } from 'react';
import Routes from 'structure/Routes'
import Sidebar from 'structure/Sidebar'


export default class Application extends Component {

    state = {
        viewerRole: Roles.ANONYMOUS,
    }

    componentDidMount = async () => {
        const {data} = await gql(`{
            currentUser { role }
        }`)
        this.setState({
            viewerRole: data.currentUser
                ? data.currentUser.role
                : Roles.ANONYMOUS
        })
    }

    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar role={this.state.viewerRole} />
                <Layout>
                    <Layout.Content style={{padding: '1rem'}}>
                        <Routes role={this.state.viewerRole} />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
