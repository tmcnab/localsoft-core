import {} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {PlusOutlined, QuestionOutlined} from '@ant-design/icons'
import Router from 'next/router'

export default class TemplatePage extends Component {

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		// dataSource: UsersTable.propTypes.dataSource,
	}

	extra =
		<>
			<Tooltip title='New RECORD'>
				<Button icon={<PlusOutlined />} onClick={() => Router.push('LINK')} shape='circle' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<div>Page Content</div>

	render = () =>
		<DashboardLayout path='PATH'>
			<PageHeader extra={this.extra} footer={this.footer} title='Template Page' />
		</DashboardLayout>

}
