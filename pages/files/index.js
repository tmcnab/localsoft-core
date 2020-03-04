import {} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {QuestionOutlined, UploadOutlined} from '@ant-design/icons'

export default class TemplatePage extends Component {

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		// dataSource: UsersTable.propTypes.dataSource,
	}

	extra =
		<>
			<Tooltip title='Upload File(s)'>
				<Button disabled icon={<UploadOutlined />} shape='circle' type='primary' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<div>Page Content</div>

	render = () =>
		<DashboardLayout path='/files'>
			<PageHeader extra={this.extra} footer={this.footer} title='Files' />
		</DashboardLayout>

}
