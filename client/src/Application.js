import {BrowserRouter} from 'react-router-dom'
import {get} from 'lodash'
import {Layout} from 'antd'
import {Roles} from './enums'
import gql from 'gql'
import React, { Component } from 'react';
import Routes from 'structure/Routes'
import Sidebar from 'structure/Sidebar'


export default class Application extends Component {

    constructor (props) {
        super(props)
        window.application = this;
    }

    state = {
        role: Roles.ANONYMOUS,
    }

    componentDidMount = async () => {
        const {currentUser} = await gql(`{
            currentUser { role }
        }`)

        this.setState({
            role: get(currentUser, 'role', Roles.ANONYMOUS)
        })
    }

    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar role={this.state.role} />
                <Layout>
                    <Layout.Content className='p1'>
                        <Routes role={this.state.role} />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
