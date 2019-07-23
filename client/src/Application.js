import {BrowserRouter} from 'react-router-dom'
import {Layout} from 'antd'
import {Roles} from './enums'
import AuthenticationPage from 'pages/AuthenticationPage'
import gql from 'gql'
import Header from 'structure/Header'
import React, { Component } from 'react';
import Routes from 'structure/Routes'

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

        const {user} = await gql(`{
            user { role }
        }`)

        this.setState({
            loading: false,
            role: user.role,
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
                <Layout className='full-height'>
					<Header role={role} />
					<Layout>
	                    <Layout.Content className='bg-white p1'>
	                        <Routes role={role} />
	                    </Layout.Content>
					</Layout>
                </Layout>
            </BrowserRouter>
        )
    }

}
