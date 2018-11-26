import {BrowserRouter} from 'react-router-dom'
import {get} from 'lodash'
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
        const {currentUser} = await gql(`{
            currentUser { role }
        }`)

        this.setState({
            viewerRole: get(currentUser, 'role', Roles.ANONYMOUS)
        })
    }

    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar onExitClick={this.onExitClick} viewerRole={this.state.viewerRole} />
                <Layout>
                    <Layout.Content className='p1'>
                        <Routes viewerRole={this.state.viewerRole} />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
