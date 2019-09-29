import {Layout} from 'antd'
import React, {Component} from 'react'


export default class PeoplePage extends Component {

	static getInitialProps = async ({res}) => {
		if (res) {

		}
		return {
			
		}
	}

	render = () =>
		<>
			<Layout>
				<Layout.Header>Header</Layout.Header>
				<Layout>
					<Layout.Sider>Sider</Layout.Sider>
					<Layout.Content>Content</Layout.Content>
				</Layout>
				<Layout.Footer>Footer</Layout.Footer>
			</Layout>
		</>

}
