import contextualize from 'contextualize'
import Page from 'layout/Page'
import React, {Component} from 'react'
import {} from 'prop-types'

export default class SettingsPage extends Component {

	static getInitialProps = async (ctx) => {
		const {isAuthenticated, redirect} = contextualize(ctx)
		const initialProps = {}

		if (isAuthenticated) {
			// update props here
		} else {
			redirect('/')
		}

		return initialProps
	}

	render = () =>
		<Page title='Settings'>
			<p>Account Settings</p>
		</Page>

}
