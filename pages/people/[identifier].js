import {} from 'prop-types'
import {Button, Form, PageHeader} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import PersonForm from 'components/PersonForm'
import Router from 'next/router'

export default class PeopleEditorPage extends Component {

	state = {
		person: {}
	}

	extra = [
		<Button disabled icon='check' key='accept' shape='circle' type='primary' />,
		<Button disabled icon='delete' key='delete' shape='circle' type='danger' />,
		<Button disabled icon='question' key='help' shape='circle' />,
	]

	onRow = {

	}

	onBack = () =>	// TODO: confirmation that user wants to discard changes
		Router.push('/people')

	onSubmit = () =>
		console.log('submit')

	render = () =>
		<DashboardLayout>
			<PageHeader onBack={this.onBack} extra={this.extra} title='Editing Person' />
			<Form colon={false} onSubmit={this.onSubmit} style={{paddingLeft: '24px', paddingRight: '24px'}}>
				<PersonForm />
			</Form>
		</DashboardLayout>

}
