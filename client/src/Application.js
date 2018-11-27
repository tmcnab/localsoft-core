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
        instanceName: "",
        viewerRole: Roles.ANONYMOUS,
    }

    componentDidMount = async () => {
        const {account, currentUser} = await gql(`{
            account { name }
            currentUser { role }
        }`)

        this.setState({
            instanceName: account.name,
            viewerRole: get(currentUser, 'role', Roles.ANONYMOUS)
        })
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.state.instanceName !== prevState.instanceName) {
            window.document.title = this.state.instanceName
        }
    }


    render = () =>
        <BrowserRouter>
            <Layout>
                <Sidebar instanceName={this.state.instanceName} viewerRole={this.state.viewerRole} />
                <Layout>
                    <Layout.Content className='p1'>
                        <Routes viewerRole={this.state.viewerRole} />
                    </Layout.Content>
                </Layout>
            </Layout>
        </BrowserRouter>

}
