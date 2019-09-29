import {} from 'antd'
import gql from 'gql'
import Head from 'next/head'
import {array, string} from 'prop-types'
import React, {Component} from 'react'

export default class IndexPage extends Component {

	static propTypes = {
		host: string.isRequired,
		users: array
	}

	static getInitialProps = async ({req}) => {
		if (req) {
			const {users} = await gql.fromServer(req, `{
				users: allUsers {
					email
				}
			}`)
			return {
				host: req.headers.host,
				users: users,
			}
		}
	}

	render = () =>
		<>
			<Head>
				<title>Home - {this.props.host}</title>
			</Head>
			<h1>{this.props.host}</h1>
			<ul>
				{this.props.users.map((user, i) => <li key={i}>{user.email}</li>)}
			</ul>
		</>

}
