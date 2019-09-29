import {} from 'antd'
import gql from 'gql'
import Head from 'next/head'
import React, {Component} from 'react'

export default class IndexPage extends Component {

	static getInitialProps = async ({req}) => {
		if (req) {
			const url = `${req.headers.referer}api/graphql`
			const {users} = await gql(url, '{ users { name } }')
			if (req) {
				return {
					host: req.headers.host,
					users: users,
				}
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
				{this.props.users.map((user, i) => <li key={i}>{user.name}</li>)}
			</ul>
		</>

}
