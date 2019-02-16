import {BrowserRouter} from 'react-router-dom'
import {get} from 'lodash'
import {Layout} from 'antd'
import {Roles} from './enums'
import gql from 'gql'
import React, { Component } from 'react';
import Routes from 'structure/Routes'
import Sidebar from 'structure/Sidebar'
import AuthenticationPage from 'pages/AuthenticationPage'


export default class Application extends Component {

    constructor (props) {
        super(props)
        window.application = this;
    }

    state = {
        loading: false,
        role: Roles.ANONYMOUS,
    }

    componentDidMount = async () => {
        this.setState({loading: true})

        const {currentUser} = await gql(`{
            currentUser { role }
        }`)

        this.setState({
            loading: false,
            role: get(currentUser, 'role', Roles.ANONYMOUS),
        })
    }

    render = () => {
        const {loading, role} = this.state

        // If we're loading just return nothing.
        if (loading) {
            return null
        }

        // If the user's role is ANONYMOUS, show the AuthenticationPage
        if (role === Roles.ANONYMOUS) {
            return <AuthenticationPage />
        }

        return (
            <BrowserRouter>
                <Layout className='full-height' style={{margin: '0 auto 0 auto', maxWidth: 1200}}>
                    <Sidebar role={role} />
                    <Layout.Content className='bg-white p1'>
                        <Routes role={role} />
                    </Layout.Content>
                </Layout>
            </BrowserRouter>
        )
    }

}
