import {} from 'antd'
import gql from 'gql'
import Page from '../layout/Page'
import {array, string} from 'prop-types'
import React, {Component} from 'react'

const query  = `{
	users: allUsers {
		email
	}
}`

export default class IndexPage extends Component {

	static propTypes = {
		host: string.isRequired,
		users: array
	}

	static getInitialProps = async ({req}) => {
		if (req) {
			const {users} = await gql.fromServer(req, query)
			return {
				host: req.headers.host,
				users: users,
			}
		} else {
			const {users} = await gql.fromClient(query)
			return {
				host: window.location.host,
				users: users,
			}
		}
	}

	render = () =>
		<Page title='Welcome' footer>
			<h1>{this.props.host}</h1>
			<ul>
				{this.props.users.map((user, i) => <li key={i}>{user.email}</li>)}
			</ul>
		</Page>

}
